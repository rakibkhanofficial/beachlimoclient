import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { metersToMiles } from "~@/utils/convertmeterIntoMiles";
import { CiGps } from "react-icons/ci";

const containerStyle = {
  width: "100%",
  height: "450px",
};

interface GooglemapProps {
  pickupPlace?: google.maps.places.PlaceResult | null;
  dropoffPlace?: google.maps.places.PlaceResult | null;
}

const Googlemap = ({ pickupPlace, dropoffPlace }: GooglemapProps) => {
  const { handleInputChange } = UseCityToCity();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [userPosition, setUserPosition] = useState<google.maps.LatLng | google.maps.LatLngLiteral | null>(null);
  const [accuracy, setAccuracy] = useState<number>(100);

  useEffect(() => {
    if (pickupPlace?.geometry?.location && dropoffPlace?.geometry?.location && isLoaded && google.maps) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupPlace.geometry.location,
          destination: dropoffPlace.geometry.location,
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
  }, [pickupPlace, dropoffPlace, isLoaded, handleInputChange]);

  useEffect(() => {
    if (!isLoaded || !google.maps) return;

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng: google.maps.LatLngLiteral = { lat: latitude, lng: longitude };
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
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [isLoaded, map, userMarker]);

  const handleGPSButtonClick = () => {
    if (!isLoaded || !google.maps) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new google.maps.LatLng(latitude, longitude);
          setUserPosition(userLatLng);
          setAccuracy(position.coords.accuracy);
          map?.panTo(userLatLng);
          map?.setZoom(Math.round(16 - Math.log(position.coords.accuracy) / Math.LN2));
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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

          if (!pickupPlace) {
            const marker = new google.maps.Marker({
              position: latLng,
              map: map!,
            });
            setPickupMarker(marker);
            handleInputChange("pickupLocation", locationLink);
            handleInputChange("pickupAddress", formattedAddress);
          } else if (!dropoffPlace) {
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
                origin: pickupPlace.geometry!.location!,
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
    },
    [isLoaded, pickupPlace, dropoffPlace, map, handleInputChange]
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
      {pickupPlace?.geometry?.location && <Marker position={pickupPlace.geometry.location} />}
      {dropoffPlace?.geometry?.location && <Marker position={dropoffPlace.geometry.location} />}
      {userMarker && <Marker position={userMarker.getPosition()!} />}
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      <button
        type="button"
        title="gps"
        className="absolute top-20 right-3 z-[1] p-[6px] hover:text-blue-800 bg-white border shadow-lg border-gray-100 rounded-sm cursor-pointer flex gap-2 justify-center items-center"
        onClick={handleGPSButtonClick}
      >
        <span><CiGps size={25} /></span>
      </button>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Googlemap);