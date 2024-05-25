import React, { useEffect, useRef } from "react";
import useGoogleMaps from "./googlemaps";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const googleMaps = useGoogleMaps();
  const { handleInputChange } = UseCityToCity();

  useEffect(() => {
    if (googleMaps && mapRef.current) {
      const centerLatLng = { lat: 23.7697, lng: 90.4103 };
      const zoomLevel = 19;

      const map = new googleMaps.Map(mapRef.current, {
        center: centerLatLng,
        zoom: zoomLevel,
      });

      const handleMapClick = (event) => {
        const clickedLocation = event.latLng.toJSON();
        const geocoder = new googleMaps.Geocoder();

        geocoder.geocode({ location: clickedLocation }, (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            const formattedAddress = results[0].formatted_address;
            const locationLink = `https://maps.app.goo.gl/?q=${encodeURIComponent(formattedAddress)}`;
            handleInputChange("maplink", locationLink);
            handleInputChange("adress", formattedAddress);
          } else {
            console.error("No results found");
          }
        });
      };

      map.addListener('click', handleMapClick);
    }
  }, [googleMaps]);

  return (
    <div ref={mapRef} className="h-[450px] w-full rounded-xl"></div>
  );
};

export default GoogleMap;
