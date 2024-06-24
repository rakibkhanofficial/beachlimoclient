import React, { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web"; // Import AnimationItem
import zeepcarrunninganimation from "./jeeprcarnobg.json";

const ZeepCarRunningAnimation = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<AnimationItem | null>(null); // Adjust the type here
  const parentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animationInstance.current = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: zeepcarrunninganimation,
      // Add width and height properties here
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice", // Adjust this according to your needs
        progressiveLoad: true,
      },
      // Adjust the width and height values as per your requirement
    });

    return () => {
      // Cleanup function to stop animation when component unmounts
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={parentContainer}>
      <div ref={animationContainer}></div>
    </div>
  );
};

export default ZeepCarRunningAnimation;
