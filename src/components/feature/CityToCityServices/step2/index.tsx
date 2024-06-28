import React, { useState, useEffect, useRef } from "react";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { Button, Input } from "@nextui-org/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Googlemap from "./googlemap";
import { Loader } from "@googlemaps/js-api-loader";
import { metersToMiles } from "~@/utils/convertmeterIntoMiles";

const LocationSelection = () => {
  const {
    pickupAddress,
    dropoffAddress,
    distance,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleInputChange,
    FarePriceCalculationBymiles,
  } = UseCityToCity();

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [pickupPlace, setPickupPlace] = useState<null>(null);
  const [dropoffPlace, setDropoffPlace] = useState<null>(null);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

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

      const pickupAutocomplete = new window.google.maps.places.Autocomplete(
        pickupInputRef.current,
        options
      );

      pickupAutocomplete.addListener("place_changed", () => {
        const place: google.maps.places.PlaceResult = pickupAutocomplete.getPlace();
        setPickupPlace(place);
        handleInputChange("pickupAddress", place.formatted_address);
        const pickuplocationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.formatted_address)}`;
        handleInputChange("pickupLocation", pickuplocationLink);
      });

      const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
        dropoffInputRef.current,
        options
      );

      dropoffAutocomplete.addListener("place_changed", () => {
        const place: google.maps.places.PlaceResult = dropoffAutocomplete.getPlace();
        setDropoffPlace(place);
        handleInputChange("dropoffAddress", place.formatted_address);
        const dropOfflocationLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.formatted_address)}`;
        handleInputChange("dropoffLocation", dropOfflocationLink);
      });
    }
  }, [isScriptLoaded]);

  useEffect(() => {
    if (pickupPlace && dropoffPlace) {
      calculateDistance();
    }
  }, [pickupPlace, dropoffPlace]);

  const calculateDistance = () => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickupPlace.geometry.location],
        destinations: [dropoffPlace.geometry.location],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response: google.maps.DistanceMatrixResponse | null, status) => {
        if (status === "OK") {
          const element = response.rows[0].elements[0];
          const distanceInMeters = element.distance?.value;
          const distanceInMiles = metersToMiles(distanceInMeters); // Convert meters to miles
          handleInputChange("distance", distanceInMiles);
          const durationInSeconds = element.duration?.value;
          const durationInHours = (durationInSeconds / 3600).toFixed(2);
          handleInputChange("hour", durationInHours);
        }
      }
    );
  };

  return (
    <div className="w-full text-black dark:text-white px-2 ">
      <button
        title="go back"
        type="button"
        onClick={handleCitytoCityBack}
        className=" flex items-center justify-center gap-2 font-medium text-black hover:text-blue-700 dark:text-white "
      >
        <span>
          <MdArrowBackIos />
        </span>
        <span>Go Back</span>
      </button>
      <h1 className=" my-3 lg:my-10 text-center text-xl font-semibold ">
        Select Your Pickup and Drop Off Location
      </h1>
      <div className="w-full">
        <div className=" w-full lg:my-5 grid lg:grid-cols-2 items-center lg:justify-center gap-4 lg:px-10 lg:py-5 ">
          <div className="w-full">
            <Googlemap />
          </div>
          <div className=" w-full flex flex-col gap-5 ">
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
              // onChange={(e) => handleInputChange("distance", e.target.value)}
              label="Distance"
              placeholder="Select Pick Up Address and Drop Off Address From Map"
              className="text-black dark:text-white"
              value={`${distance} Miles`}
            />
            <div className=" rounded-2xl text-black dark:text-white border border-gray-700 bg-gray-200 px-3 py-4 dark:bg-zinc-700">
              {FarePriceCalculationBymiles !== "NaN"
                ? FarePriceCalculationBymiles
                : "Fair Price"}{" "}
              $
            </div>
          </div>
        </div>
        <div className=" my-4 flex items-center justify-center ">
          <Button
            className=" w-[80%] lg:w-[40%] "
            color="success"
            isDisabled={distance === ""}
            onClick={handleCitytoCityNext}
          >
            <span className=" text-white text-lg ">Next</span>
            <span className=" text-white text-lg ">
              <MdArrowForwardIos />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;
