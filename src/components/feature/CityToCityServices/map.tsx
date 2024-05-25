import React, { useEffect, useRef, useState } from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import useGoogleMaps from "./googlemaps";

/// <reference types="@types/google.maps" />

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

      const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const clickedLocation = event.latLng.toJSON();
          const geocoder = new googleMaps.Geocoder();

          geocoder.geocode({ location: clickedLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              const locationLink = `https://maps.app.goo.gl/?q=${encodeURIComponent(formattedAddress)}`;

              if (isPickup) {
                if (pickupMarker) pickupMarker.setMap(null); // Remove the old marker if exists
                const marker = new googleMaps.Marker({
                  position: clickedLocation,
                  map: map,
                  label: "P",
                });
                setPickupMarker(marker);
                handleInputChange("pickupLocation", locationLink);
                handleInputChange("pickupAddress", formattedAddress);
              } else {
                if (dropoffMarker) dropoffMarker.setMap(null); // Remove the old marker if exists
                const marker = new googleMaps.Marker({
                  position: clickedLocation,
                  map: map,
                  label: "D",
                });
                setDropoffMarker(marker);
                handleInputChange("dropoffLocation", locationLink);
                handleInputChange("dropoffAddress", formattedAddress);
              }
              setIsPickup(!isPickup); // Toggle between pickup and drop-off
            } else {
              console.error("No results found");
            }
          });
        }
      };

      map.addListener('click', handleMapClick);
    }
  }, [googleMaps, handleInputChange, isPickup, pickupMarker, dropoffMarker]);

  return (
    <div ref={mapRef} className="h-[450px] w-full rounded-xl"></div>
  );
};

export default GoogleMap;
