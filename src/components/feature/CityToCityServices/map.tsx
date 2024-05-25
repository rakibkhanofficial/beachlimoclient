import React, { useEffect, useRef, useState } from "react";
import useGoogleMaps from "./googlemaps";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMaps = useGoogleMaps();
  const { handleInputChange } = UseCityToCity();
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
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

      const handleMapClick = (event: google.maps.MouseEvent) => {
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
                          if (directionsRenderer) {
                            directionsRenderer.setDirections(result);
                          } else {
                            const renderer = new googleMaps.DirectionsRenderer({
                              map,
                              directions: result,
                            });
                            setDirectionsRenderer(renderer);
                          }
                          const route = result.routes[0];
                          const distance = route.legs[0].distance?.text;
                          handleInputChange("distance", distance || "");
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

      const clickListener = googleMaps.event && googleMaps.event.addListener
        ? googleMaps.event.addListener(map, 'click', handleMapClick)
        : null;

      return () => {
        if (clickListener && googleMaps.event && googleMaps.event.removeListener) {
          googleMaps.event.removeListener(clickListener);
        }
      };
    }
  }, [googleMaps, handleInputChange, isPickup, pickupMarker, dropoffMarker, directionsRenderer]);

  return (
    <div ref={mapRef} className="h-[450px] w-full rounded-xl"></div>
  );
};

export default GoogleMap;
