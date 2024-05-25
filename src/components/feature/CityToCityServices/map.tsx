import React, { useEffect, useRef, useState } from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMaps, setGoogleMaps] = useState<any>(null);
  const { handleInputChange } = UseCityToCity();
  const [pickupMarker, setPickupMarker] = useState<google.maps.Marker | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<google.maps.Marker | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const initGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        document.head.append(script);

        script.addEventListener('load', () => {
          setGoogleMaps(window.google.maps);
        });
      } else {
        setGoogleMaps(window.google.maps);
      }
    };

    initGoogleMaps();
  }, []);

  useEffect(() => {
    if (googleMaps && mapRef.current) {
      const map = new googleMaps.Map(mapRef.current, {
        center: { lat: 23.7697, lng: 90.4103 },
        zoom: 14,
      });

      const directionsService = new googleMaps.DirectionsService();
      const geocoder = new googleMaps.Geocoder();

      const handleMapClick = (event: google.maps.MouseEvent) => {
        if (event.latLng) {
          const clickedLocation = event.latLng.toJSON();

          geocoder.geocode({ location: clickedLocation }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              const locationLink = `https://maps.app.goo.gl/?q=${encodeURIComponent(formattedAddress)}`;

              if (!pickupMarker) {
                const marker = new googleMaps.Marker({
                  position: clickedLocation,
                  map: map,
                  icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Green marker icon
                  }
                });
                setPickupMarker(marker);
                handleInputChange("pickupLocation", locationLink);
                handleInputChange("pickupAddress", formattedAddress);
              } else if (!dropoffMarker) {
                const marker = new googleMaps.Marker({
                  position: clickedLocation,
                  map: map,
                  icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red marker icon
                  }
                });
                setDropoffMarker(marker);
                handleInputChange("dropoffLocation", locationLink);
                handleInputChange("dropoffAddress", formattedAddress);

                if (directionsRenderer) {
                  directionsRenderer.setMap(null); // Clear existing directions
                }

                directionsService.route(
                  {
                    origin: pickupMarker.getPosition(),
                    destination: clickedLocation,
                    travelMode: googleMaps.TravelMode.DRIVING,
                  },
                  (result, status) => {
                    if (status === googleMaps.DirectionsStatus.OK) {
                      const renderer = new googleMaps.DirectionsRenderer({
                        map,
                        directions: result,
                        polylineOptions: {
                          strokeColor: 'blue', // Blue direction line
                        }
                      });
                      setDirectionsRenderer(renderer);

                      const route = result.routes[0];
                      const distance = route.legs[0].distance?.text;
                      handleInputChange("distance", distance || "");
                    } else {
                      console.error("Directions request failed due to " + status);
                    }
                  }
                );
              }
            } else {
              console.error("No results found");
            }
          });
        }
      };

      const clickListener = googleMaps.event.addListener(map, 'click', handleMapClick);

      return () => {
        if (clickListener) {
          googleMaps.event.removeListener(clickListener);
        }
      };
    }
  }, [googleMaps, handleInputChange, pickupMarker, dropoffMarker]);

  return (
    <div ref={mapRef} className="h-[450px] w-full rounded-xl"></div>
  );
};

export default GoogleMap;