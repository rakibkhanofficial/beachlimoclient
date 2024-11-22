import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { metersToMiles } from "~@/utils/convertmeterIntoMiles";
import { CiGps } from "react-icons/ci";
import UseAirportTransfer from "~@/modules/servicemodule/hocs/airporttransferservice/useAirportTransferService";

const containerStyle = {
  width: "100%",
  height: "450px",
};

interface GooglemapProps {
  pickupPlace?: google.maps.places.PlaceResult | null;
  dropoffPlace?: google.maps.places.PlaceResult | null;
  pickuplatlng?: google.maps.LatLngLiteral | null;
  dropOfflatlng?: google.maps.LatLngLiteral | null;
}

const Googlemap = ({
  pickupPlace,
  dropoffPlace,
  pickuplatlng,
  dropOfflatlng,
}: GooglemapProps) => {
  const { handleInputChange } = UseAirportTransfer();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(
    null,
  );
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(
    null,
  );
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [userPosition, setUserPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);

  // Automatically calculate route if pickuplatlng and dropOfflatlng are provided
  useEffect(() => {
    if (
      pickuplatlng &&
      dropOfflatlng &&
      !isNaN(pickuplatlng.lat) &&
      !isNaN(pickuplatlng.lng) &&
      !isNaN(dropOfflatlng.lat) &&
      !isNaN(dropOfflatlng.lng) &&
      isLoaded &&
      google.maps
    ) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickuplatlng,
          destination: dropOfflatlng,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirectionsResponse(result);
            const route = result.routes[0];
            const distanceInMeters = route.legs[0].distance?.value;
            const convertDistanceInMiles = distanceInMeters
              ? metersToMiles(distanceInMeters)
              : undefined;
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
        },
      );
    }
  }, [pickuplatlng, dropOfflatlng, isLoaded, handleInputChange]);

  // Handle user location tracking
  useEffect(() => {
    if (!isLoaded || !google.maps || !map) return;

    let watchId: number;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (!isNaN(latitude) && !isNaN(longitude)) {
            const userLatLng = new google.maps.LatLng(latitude, longitude);
            setUserPosition(userLatLng);

            if (userMarker) {
              userMarker.setPosition(userLatLng);
            } else {
              const newUserMarker = new google.maps.Marker({
                position: userLatLng,
                map: map,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
                optimized: false,
              });
              setUserMarker(newUserMarker);
            }
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 2000,
        },
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      if (userMarker) {
        userMarker.setMap(null);
      }
    };
  }, [isLoaded, map, userMarker]);

  // Handle map click to set pickup and dropoff locations
  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!isLoaded || !google.maps) return;

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
              title: "Pickup Location",
              animation: google.maps.Animation.DROP,
            });
            setPickupMarker(marker);
            handleInputChange("pickupLocation", locationLink);
            handleInputChange("pickupAddress", formattedAddress);
          } else if (!dropoffMarker) {
            const marker = new google.maps.Marker({
              position: latLng,
              map: map!,
              title: "Dropoff Location",
              animation: google.maps.Animation.DROP,
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
                  const convertDistanceInMiles = distanceInMeters
                    ? metersToMiles(distanceInMeters)
                    : undefined;
                  if (convertDistanceInMiles) {
                    handleInputChange("distance", convertDistanceInMiles);
                  }

                  const durationInSeconds = route.legs[0].duration?.value;
                  if (durationInSeconds) {
                    const durationInHours = (durationInSeconds / 3600).toFixed(
                      2,
                    );
                    handleInputChange("hour", durationInHours);
                  }
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
    [isLoaded, pickupMarker, dropoffMarker, map, handleInputChange],
  );

  const handleGPSButtonClick = () => {
    if (!isLoaded || !google.maps) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (!isNaN(latitude) && !isNaN(longitude)) {
            const userLatLng = new google.maps.LatLng(latitude, longitude);
            setUserPosition(userLatLng);
            map?.panTo(userLatLng);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userPosition || { lat: 28.5383, lng: -81.3792 }}
      zoom={14}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(null)}
      onClick={handleMapClick}
    >
      {pickuplatlng && !isNaN(pickuplatlng.lat) && !isNaN(pickuplatlng.lng) && (
        <Marker position={pickuplatlng} />
      )}
      {dropOfflatlng &&
        !isNaN(dropOfflatlng.lat) &&
        !isNaN(dropOfflatlng.lng) && <Marker position={dropOfflatlng} />}
      {userMarker && userPosition && <Marker position={userPosition} />}
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
      <button
        type="button"
        title="gps"
        className="absolute right-3 top-20 z-[1] flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-100 bg-white p-[6px] shadow-lg hover:text-blue-800 dark:text-black"
        onClick={handleGPSButtonClick}
      >
        <span>
          <CiGps size={25} />
        </span>
      </button>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Googlemap);
