import React, { useState, useEffect, useRef } from "react";
import UseAirportTransfer from "~@/modules/servicemodule/hocs/airporttransferservice/useAirportTransferService";
import { Button, Input } from "@nextui-org/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Googlemap from "./googlemap";
import { Loader } from "@googlemaps/js-api-loader";
import { metersToMiles } from "~@/utils/convertmeterIntoMiles";

// Define the props type
interface GooglemapProps {
  pickupPlace?: google.maps.places.PlaceResult | null;
  dropoffPlace?: google.maps.places.PlaceResult | null;
}

const LocationSelection = () => {
  const {
    pickupAddress,
    dropoffAddress,
    distance,
    hour,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleInputChange,
    TotalFarePriceCalculationByhours,
  } = UseAirportTransfer();

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [pickupPlace, setPickupPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [dropoffPlace, setDropoffPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`, // replace with your Google Maps API key
      libraries: ["places"],
    });

    loader.load().then(() => {
      setIsScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      const options = {
        types: ["geocode"],
        componentRestrictions: { country: "us" }, // adjust to your country
      };

      if (pickupInputRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(
          pickupInputRef.current,
          options,
        );

        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          setPickupPlace(place);
          handleInputChange("pickupAddress", place.formatted_address || "");
          const pickuplocationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.formatted_address || "")}`;
          handleInputChange("pickupLocation", pickuplocationLink);
        });
      }

      if (dropoffInputRef.current) {
        const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
          dropoffInputRef.current,
          options,
        );

        dropoffAutocomplete.addListener("place_changed", () => {
          const place = dropoffAutocomplete.getPlace();
          setDropoffPlace(place);
          handleInputChange("dropoffAddress", place.formatted_address || "");
          const dropOfflocationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.formatted_address || "")}`;
          handleInputChange("dropoffLocation", dropOfflocationLink);
        });
      }
    }
  }, [isScriptLoaded, handleInputChange]);

  useEffect(() => {
    if (pickupPlace && dropoffPlace) {
      calculateDistanceAndTime();
    }
  }, [pickupPlace, dropoffPlace]);

  const calculateDistanceAndTime = () => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickupPlace!.geometry!.location!],
        destinations: [dropoffPlace!.geometry!.location!],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          const element = response?.rows[0].elements[0];
          const distanceInMeters = element?.distance?.value;
          const distanceInMiles = metersToMiles(distanceInMeters || 0);
          handleInputChange("distance", distanceInMiles);

          const durationInSeconds = element?.duration?.value;
          const durationInHours = ((durationInSeconds || 0) / 3600).toFixed(2);
          handleInputChange("hour", durationInHours);
        }
      }
    );
  };

  return (
    <div className="w-full text-black dark:text-white px-2">
      <button
        title="go back"
        type="button"
        onClick={handleCitytoCityBack}
        className="flex items-center justify-center gap-2 font-medium text-black hover:text-blue-700 dark:text-white"
      >
        <span>
          <MdArrowBackIos />
        </span>
        <span>Go Back</span>
      </button>
      <h1 className="my-3 lg:my-10 text-center text-xl font-semibold">
        Select Your Pickup and Drop Off Location
      </h1>
      <div className="w-full">
        <div className="w-full lg:my-5 grid lg:grid-cols-2 items-center lg:justify-center gap-4 lg:px-10 lg:py-5">
          <div className="w-full">
            <Googlemap pickupPlace={pickupPlace} dropoffPlace={dropoffPlace} />
          </div>
          <div className="w-full flex flex-col gap-5">
            <Input
              ref={pickupInputRef}
              onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
              label="Pick Up Location"
              placeholder="Select Pick Up Address From Map"
              className="text-black dark:text-white"
              value={pickupAddress}
            />
            <Input
              ref={dropoffInputRef}
              onChange={(e) => handleInputChange("dropoffAddress", e.target.value)}
              label="Drop Off Location"
              placeholder="Select Drop Off Address From Map"
              className="text-black dark:text-white"
              value={dropoffAddress}
            />
            <Input
              readOnly
              label="Distance"
              placeholder="Select Pick Up Address and Drop Off Address From Map"
              className="text-black dark:text-white"
              value={`${distance} Miles`}
            />
              <Input
              label="Hour"
              placeholder="Enter Hour"
              type="number"
              name="hour"
              min={0}
              value={hour}
              readOnly
              inputMode="numeric"
            />
            <div className="rounded-2xl text-black dark:text-white border border-gray-700 bg-gray-200 px-3 py-4 dark:bg-zinc-700">
              {TotalFarePriceCalculationByhours !== "NaN"
                ? TotalFarePriceCalculationByhours
                : "Fair Price"}{" "}
              $
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center justify-center">
          <Button
            className="w-[80%] lg:w-[40%]"
            color="success"
            isDisabled={distance === ""}
            onClick={handleCitytoCityNext}
          >
            <span className="text-white text-lg">Next</span>
            <span className="text-white text-lg">
              <MdArrowForwardIos />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;