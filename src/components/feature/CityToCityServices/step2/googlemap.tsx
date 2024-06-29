import React, { useState, useEffect, useCallback } from "react";
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

const Googlemap = () => {
  const { handleInputChange } = UseCityToCity();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [userPosition, setUserPosition] = useState<google.maps.LatLng | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new google.maps.LatLng(latitude, longitude);
          setUserPosition(userLatLng);
          setUserMarker(
            new google.maps.Marker({
              position: userLatLng,
              map: map,
              title: "Your Location",
            })
          );
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map]);

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
                const distanceInMeters = route.legs[0].distance?.value;
                const convertDistanceInMiles = distanceInMeters ? metersToMiles(distanceInMeters) : undefined;
                if (convertDistanceInMiles) {
                  handleInputChange("distance", convertDistanceInMiles);
                }

                const durationInSeconds = route.legs[0].duration?.value;
                if (durationInSeconds) {
                  const durationInHours = (durationInSeconds / 3600).toFixed(2);
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
      center={userPosition || { lat: 28.5383, lng: -81.3792 }}
      zoom={14}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(null)}
      onClick={handleMapClick}
    >
      {pickupMarker && <Marker position={pickupMarker.getPosition()!} />}
      {dropoffMarker && <Marker position={dropoffMarker.getPosition()!} />}
      {userMarker && <Marker position={userMarker.getPosition()!} />}
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Googlemap);