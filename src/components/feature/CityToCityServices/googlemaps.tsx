import { useEffect, useState } from 'react';

const useGoogleMaps = () => {
  const [googleMaps, setGoogleMaps] = useState(null);

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

  return googleMaps;
};

export default useGoogleMaps;