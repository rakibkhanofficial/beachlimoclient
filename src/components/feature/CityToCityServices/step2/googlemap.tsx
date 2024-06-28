import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { metersToMiles } from "~@/utils/convertmeterIntoMiles";

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
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (!latLng) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const formattedAddress = results[0].formatted_address;
        const locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;

        if (!pickupMarker) {
          const marker = new google.maps.Marker({
            position: latLng,
            map: map!,
          });
          setPickupMarker(marker);
          handleInputChange("pickupLocation", locationLink);
          handleInputChange("pickupAddress", formattedAddress);
        } else if (!dropoffMarker) {
          const marker = new google.maps.Marker({
            position: latLng,
            map: map!,
          });
          setDropoffMarker(marker);
          handleInputChange("dropoffLocation", locationLink);
          handleInputChange("dropoffAddress", formattedAddress);

          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: pickupMarker.getPosition()!,
              destination: latLng,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK && result) {
                setDirectionsResponse(result);
                const route = result.routes[0];
                const distanceInMeter: number | undefined = route.legs[0].distance?.value;
                const convertDistanceInMiles = metersToMiles(distanceInMeter);
                if (convertDistanceInMiles) {
                  handleInputChange("distance", convertDistanceInMiles);
                }
                const durationInSeconds: number | undefined = route.legs[0].duration?.value;
                const durationInHours = (durationInSeconds / 3600).toFixed(2);
                if (durationInHours) {
                  handleInputChange("hour", durationInHours);
                }
              } else {
                console.error("Directions request failed due to ", status);
              }
            }
          );
        }
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  }, [pickupMarker, dropoffMarker, map, handleInputChange]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {pickupMarker && <Marker position={pickupMarker.getPosition()!} />}
      {dropoffMarker && <Marker position={dropoffMarker.getPosition()!} />}
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  ) : <></>;
};

export default React.memo(Googlemap);
