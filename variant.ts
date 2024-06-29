export const fadeIn = (direction: any, delay: any) => {
    let transitionConfig: {
      hidden: {
        y: number;
        opacity: number;
        x?: number; // Define x as an optional property
      };
      show: {
        y: number;
        opacity: number;
        x?: number; // Define x as an optional property
        transition: {
          type: string;
          duration: number;
          delay: any;
          ease: number[];
        };
      };
    } = {
      hidden: {
        y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  
    // Add x transition based on direction
    if (direction === "left" || direction === "right") {
      transitionConfig.hidden.x = direction === "left" ? 80 : direction === "right" ? -80 : 0;
      transitionConfig.show.x = 0;
    }
  
    return transitionConfig;
  };
  