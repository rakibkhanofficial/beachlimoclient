import React, { useState, useEffect, useRef } from "react";
import { Input } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@googlemaps/js-api-loader";
import { FaMapMarkerAlt } from "react-icons/fa";

// Declare the google namespace to avoid "Cannot find namespace 'google'" error
declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapAddressInputProps {
  apiKey: string;
  label: string;
  placeholder: string;
  onAddressSelect: (
    address: string,
    location: google.maps.LatLngLiteral,
    placeId: string,
    locationLink: string
  ) => void;
  onInputChange: (value: string) => void;
  country?: string;
  className?: string;
  inputValue?: string
}

const GoogleMapAddressInput: React.FC<GoogleMapAddressInputProps> = ({
  apiKey,
  label,
  placeholder,
  onAddressSelect,
  onInputChange,
  country = "us",
  className = "",
  inputValue,
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      libraries: ["places"],
    });

    loader.load().then(() => {
      setIsScriptLoaded(true);
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      if (inputRef.current) {
        placesService.current = new window.google.maps.places.PlacesService(
          inputRef.current
        );
      }
    });
  }, [apiKey]);

  const handleInputChange = (value: string) => {
    onInputChange(value);

    if (value.length > 2 && isScriptLoaded && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country },
        },
        (
          results: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results
          ) {
            setPredictions(results);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelectPrediction = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    setPredictions([]);

    if (placesService.current) {
      placesService.current.getDetails(
        { placeId: prediction.place_id },
        (
          place: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
          ) {
            const location: google.maps.LatLngLiteral = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            const locationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              place.formatted_address || prediction.description
            )}`;
            onAddressSelect(
              prediction.description,
              location,
              prediction.place_id,
              locationLink
            );
          }
        }
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full"
        startContent={<FaMapMarkerAlt className="text-gray-400" />}
      />
      <AnimatePresence>
        {predictions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 dark:border-gray-800 border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {predictions.map((prediction) => (
              <motion.li
                key={prediction.place_id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.1 }}
                className="px-2 flex justify-start items-center gap-2 py-2 text-xs 2xl:text-base hover:bg-gray-100 dark:hover:bg-zinc-700 text-black dark:text-white cursor-pointer"
                onClick={() => handleSelectPrediction(prediction)}
              >
               <FaMapMarkerAlt className="text-gray-400" /> {prediction.description}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoogleMapAddressInput;
