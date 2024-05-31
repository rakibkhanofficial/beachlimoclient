// utils/timeConverter.ts

/**
 * Convert 24-hour time format to 12-hour format based on user's local time.
 * @param time24h - Time in 24-hour format (HH:mm:ss).
 * @returns Time in 12-hour format (hh:mm:ss AM/PM).
 */
export const convertTo12HourFormat = (time24h: string): string => {
    // Split the input time into hours, minutes, and seconds
    const [hours, minutes, seconds] = time24h.split(':').map(Number);

    // Determine AM or PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12; // Modulus 12 and handle 0 (midnight)

    // Pad single-digit minutes and seconds with leading zeros if necessary
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    // Construct the 12-hour time format string
    return `${hours12}:${paddedMinutes}:${paddedSeconds} ${suffix}`;
};
