import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import UseBytheHour from "~@/modules/servicemodule/hocs/bythehourservice/usebythehourService";
import { metersToMiles } from "~@/utils/convertmeterIntoMiles";
import { CiGps } from "react-icons/ci";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const Googlemap = () => {
  const { handleInputChange, pickupAddress, dropoffAddress } = UseBytheHour();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(
    null,
  );
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(
    null,
  );
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [userPosition, setUserPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);
  const [accuracy, setAccuracy] = useState<number>(100);

  useEffect(() => {
    if (!isLoaded || typeof google === "undefined") return;

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng: google.maps.LatLngLiteral = {
            lat: latitude,
            lng: longitude,
          };
          setUserPosition(userLatLng);
          setAccuracy(position.coords.accuracy);

          if (!userMarker) {
            const marker = new google.maps.Marker({
              position: userLatLng,
              map: map,
              title: "Your Location",
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#4285F4",
                strokeOpacity: 1,
              },
              animation: google.maps.Animation.BOUNCE,
            });
            setUserMarker(marker);
          } else {
            userMarker.setPosition(userLatLng);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [isLoaded, map, userMarker]);

  const handleGPSButtonClick = () => {
    if (!isLoaded || typeof google === "undefined") return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new google.maps.LatLng(latitude, longitude);
          setUserPosition(userLatLng);
          setAccuracy(position.coords.accuracy);
          map?.panTo(userLatLng);
          map?.setZoom(
            Math.round(16 - Math.log(position.coords.accuracy) / Math.LN2),
          );
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

  const geocodeAddress = useCallback(
    (address: string, callback: (latLng: google.maps.LatLng) => void) => {
      if (!isLoaded || typeof google === "undefined") return;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          callback(results[0].geometry.location);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      });
    },
    [isLoaded],
  );

  useEffect(() => {
    if (
      !isLoaded ||
      typeof google === "undefined" ||
      !pickupAddress ||
      !dropoffAddress
    )
      return;

    geocodeAddress(pickupAddress, (pickupLatLng) => {
      if (pickupMarker) {
        pickupMarker.setPosition(pickupLatLng);
      } else {
        const marker = new google.maps.Marker({
          position: pickupLatLng,
          map: map!,
        });
        setPickupMarker(marker);
      }

      geocodeAddress(dropoffAddress, (dropoffLatLng) => {
        if (dropoffMarker) {
          dropoffMarker.setPosition(dropoffLatLng);
        } else {
          const marker = new google.maps.Marker({
            position: dropoffLatLng,
            map: map!,
          });
          setDropoffMarker(marker);
        }

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: pickupLatLng,
            destination: dropoffLatLng,
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
      });
    });
  }, [
    isLoaded,
    pickupAddress,
    dropoffAddress,
    pickupMarker,
    dropoffMarker,
    map,
    geocodeAddress,
    handleInputChange,
  ]);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!isLoaded || typeof google === "undefined") return;

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
      {pickupMarker && <Marker position={pickupMarker.getPosition()!} />}
      {dropoffMarker && <Marker position={dropoffMarker.getPosition()!} />}
      {userMarker && <Marker position={userMarker.getPosition()!} />}
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
      <button
        type="button"
        title="gps"
        className=" absolute right-3 top-20 z-[1] flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-100 bg-white p-[6px] shadow-lg hover:text-blue-800"
        onClick={handleGPSButtonClick}
      >
        <span>
          <CiGps size={25} />
        </span>
        {/* <span>({Math.round(accuracy)}m)</span> */}
      </button>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Googlemap);
