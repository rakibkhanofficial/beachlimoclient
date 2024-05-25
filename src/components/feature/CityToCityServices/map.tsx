import React, { useEffect, useRef, useState } from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import useGoogleMaps from "./googlemaps";

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMaps = useGoogleMaps();
  const { handleInputChange } = UseCityToCity();
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(null);
  const [isPickup, setIsPickup] = useState(true);

  useEffect(() => {
    if (googleMaps && mapRef.current) {
      const centerLatLng = { lat: 23.7697, lng: 90.4103 };
      const zoomLevel = 14;

      const map = new googleMaps.Map(mapRef.current, {
        center: centerLatLng,
        zoom: zoomLevel,
      });

      const directionsService = new googleMaps.DirectionsService();

      const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const clickedLocation = event.latLng.toJSON();
          const geocoder = new googleMaps.Geocoder();

          geocoder.geocode({ location: clickedLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              const locationLink = `https://maps.app.goo.gl/?q=${encodeURIComponent(formattedAddress)}`;

              if (isPickup) {
                if (pickupMarker) pickupMarker.setMap(null);
                const marker = new googleMaps.Marker({
                  position: clickedLocation,
                  map: map,
                  label: "P",
                });
                setPickupMarker(marker);
                handleInputChange("pickupLocation", locationLink);
                handleInputChange("pickupAddress", formattedAddress);
              } else {
                if (dropoffMarker) dropoffMarker.setMap(null);
                const marker = new googleMaps.Marker({
                  position: clickedLocation,
                  map: map,
                  label: "D",
                });
                setDropoffMarker(marker);
                handleInputChange("dropoffLocation", locationLink);
                handleInputChange("dropoffAddress", formattedAddress);

                // Calculate and display route between pickup and drop-off locations
                if (pickupMarker) {
                  const pickupLatLng = pickupMarker.getPosition();
                  if (pickupLatLng) {
                    directionsService.route(
                      {
                        origin: pickupLatLng,
                        destination: clickedLocation,
                        travelMode: googleMaps.TravelMode.DRIVING,
                      },
                      (result, status) => {
                        if (status === googleMaps.DirectionsStatus.OK) {
                          const route = result.routes[0];
                          const distance = route.legs[0].distance?.text;
                          handleInputChange("distance", distance || "");
                          const directionsRenderer = new googleMaps.DirectionsRenderer({
                            map,
                            directions: result,
                          });
                        } else {
                          console.error("Directions request failed due to " + status);
                        }
                      }
                    );
                  }
                }
              }
              setIsPickup(!isPickup);
            } else {
              console.error("No results found");
            }
          });
        }
      };

      const clickListener = map.addListener('click', handleMapClick);

      return () => {
        clickListener.remove(); // Remove the click listener
      };
    }
  }, [googleMaps, handleInputChange, isPickup, pickupMarker, dropoffMarker]);

  return (
    <div ref={mapRef} className="h-[450px] w-full rounded-xl"></div>
  );
};

export default GoogleMap;