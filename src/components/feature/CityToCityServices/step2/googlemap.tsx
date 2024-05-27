import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const center = {
  lat: 28.5383,
  lng: -81.3792,
};

const Googlemap = () => {
  const { handleInputChange } = UseCityToCity();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      const latLng = event.latLng;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const formattedAddress = results[0].formatted_address;
          const locationLink = `https://maps.app.goo.gl/?q=${encodeURIComponent(formattedAddress)}`;

          if (!pickupMarker) {
            const marker = new window.google.maps.Marker({
              position: latLng,
              map,
            });
            setPickupMarker(marker);
            handleInputChange("pickupLocation", locationLink);
            handleInputChange("pickupAddress", formattedAddress);
          } else if (!dropoffMarker) {
            const marker = new window.google.maps.Marker({
              position: latLng,
              map,
            });
            setDropoffMarker(marker);
            handleInputChange("dropoffLocation", locationLink);
            handleInputChange("dropoffAddress", formattedAddress);

            const directionsService =
              new window.google.maps.DirectionsService();
            directionsService.route(
              {
                origin: pickupMarker.getPosition(),
                destination: latLng,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  setDirectionsResponse(result);
                  const route = result.routes[0];
                  const distance = route.legs[0].distance?.text;
                  handleInputChange("distance", distance || "");
                } else {
                  console.error("Directions request failed due to ", status);
                }
              },
            );
          }
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      });
    },
    [pickupMarker, dropoffMarker, map],
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {pickupMarker && <Marker position={pickupMarker.getPosition()} />}
      {dropoffMarker && <Marker position={dropoffMarker.getPosition()} />}
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Googlemap);
