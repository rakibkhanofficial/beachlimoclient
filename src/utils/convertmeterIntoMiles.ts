export const metersToMiles = (meters: number | undefined): string => {
  if (meters === undefined) {
    return "0.00"; // or handle this case based on your specific requirements
  }

  const miles = meters * 0.000621371;
  if (miles < 1) {
    return Math.ceil(miles).toFixed(2); // Round up to the nearest whole number and format to 2 decimal places
  }
  return miles.toFixed(2); // Otherwise, format to 2 decimal places
};
