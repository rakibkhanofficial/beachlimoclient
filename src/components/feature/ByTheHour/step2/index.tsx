import React from "react";
import { Input } from "@nextui-org/react";
import GoogleMapAddressInput from "~@/components/elements/GoogleMapAdressInput";
import UseBytheHour from "~@/modules/servicemodule/hocs/bythehourservice/usebythehourService";

type PropsType = {
  setPickuplatlng: React.Dispatch<google.maps.LatLngLiteral>
  setDropofflatlng: React.Dispatch<google.maps.LatLngLiteral>
}

const LocationSelection = ({ setPickuplatlng, setDropofflatlng }: PropsType) => {
  const {
    pickupAddress,
    dropoffAddress,
    distance,
    handleInputChange,
    TotalFarePriceCalculationBymilesandhours,
  } = UseBytheHour();

  const handleDropOffGoogleMapAddressSelect = (
    address: string,
    location: google.maps.LatLngLiteral,
    placeId: string,
    locationLink: string,
  ) => {
    setDropofflatlng(location);
    handleInputChange("dropoffLocation", locationLink);
    handleInputChange("dropoffAddress", address);
  };

  const handleDropOffGoogleMapInputChange = (value: string) => {
    handleInputChange("dropoffAddress", value);
  };

  const handlePickUpGoogleMapAddressSelect = (
    address: string,
    location: google.maps.LatLngLiteral,
    placeId: string,
    locationLink: string,
  ) => {
    setPickuplatlng(location);
    handleInputChange("pickupLocation", locationLink);
    handleInputChange("pickupAddress", address);
  };

  const handlePickUpGoogleMapInputChange = (value: string) => {
    handleInputChange("pickupAddress", value);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <GoogleMapAddressInput
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        label="Pick Up Location"
        placeholder="Enter Pick Location"
        onAddressSelect={handlePickUpGoogleMapAddressSelect}
        onInputChange={handlePickUpGoogleMapInputChange}
        inputValue={pickupAddress}
      />
      <GoogleMapAddressInput
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        label="Drop Off Location"
        placeholder="Drop Off Location"
        onAddressSelect={handleDropOffGoogleMapAddressSelect}
        onInputChange={handleDropOffGoogleMapInputChange}
        inputValue={dropoffAddress}
      />
      <Input
        readOnly
        label="Distance"
        placeholder="Select Pick Up Address and Drop Off Address From Map"
        className="text-black dark:text-white"
        value={`${distance} Miles`}
      />
      <div className="rounded-2xl border bg-gray-200 px-3 py-4 text-black dark:border-gray-700 dark:bg-zinc-700 dark:text-white">
        {TotalFarePriceCalculationBymilesandhours !== "NaN"
          ? TotalFarePriceCalculationBymilesandhours
          : "Fair Price"}{" "}
        $
      </div>
    </div>
  );
};

export default LocationSelection;
