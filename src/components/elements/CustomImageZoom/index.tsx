import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageData {
  thumbnail: string;
  small: string;
  large: string;
  alt: string;
}

interface ImageZoomProps {
  images: ImageData[];
  zoomFactor?: number;
  containerClassName?: string;
  imageClassName?: string;
  thumbnailClassName?: string;
  zoomClassName?: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({
  images,
  zoomFactor = 2.5,
  containerClassName = '',
  imageClassName = '',
  thumbnailClassName = '',
  zoomClassName = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  const handleInteraction = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      let clientX, clientY;

      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = Math.max(0, Math.min(1, (clientX - left) / width));
      const y = Math.max(0, Math.min(1, (clientY - top) / height));
      setZoomPosition({ x, y });
    }
  }, []);

  const handleInteractionStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setShowZoom(true);
    handleInteraction(e);
  }, [handleInteraction]);

  const handleInteractionEnd = useCallback(() => {
    setShowZoom(false);
  }, []);

  const ThumbnailsComponent = () => (
    <div className={`flex ${isDesktop ? 'flex-col' : 'flex-row flex-wrap justify-center'} ${thumbnailClassName}`}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`cursor-pointer m-2 ${isDesktop ? 'mb-4' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveIndex(index)}
        >
          <img
            src={image.thumbnail}
            alt={image.alt}
            className={`w-16 h-16 object-cover ${index === activeIndex ? 'border-2 border-blue-500' : ''}`}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className={`relative flex ${isDesktop ? 'flex-row' : 'flex-col'} ${containerClassName}`}>
      {isDesktop && <ThumbnailsComponent />}
      <div className={`relative ${imageClassName}`}>
        <div
          ref={imageRef}
          className="relative cursor-zoom-in"
          onMouseMove={handleInteraction}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchMove={handleInteraction}
          onTouchEnd={handleInteractionEnd}
        >
          <img
            src={images[activeIndex]?.small}
            alt={images[activeIndex]?.alt}
            className="w-full h-auto object-contain"
          />
          <AnimatePresence>
            {showZoom && (
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute bg-white bg-opacity-40 border border-white pointer-events-none"
                  style={{
                    width: `${100 / zoomFactor}%`,
                    height: `${100 / zoomFactor}%`,
                    left: `${zoomPosition.x * 100 - (100 / zoomFactor) / 2}%`,
                    top: `${zoomPosition.y * 100 - (100 / zoomFactor) / 2}%`,
                  }}
                  transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {!isDesktop && <ThumbnailsComponent />}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            className={`absolute lg:w-[400px] xl:w-[350px] 2xl:w-[380px] lg:h-[350px] xl:h-[300px] 2xl:h-[340px] bg-white dark:bg-slate-900 shadow-lg rounded-lg overflow-hidden ${zoomClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              // width: '380px',
              // height: '340px',
              top: isDesktop ? '0' : '100%',
              left: isDesktop ? '100%' : '50%',
              transform: isDesktop ? 'translateX(20px)' : 'translateX(-50%)',
              zIndex: 50,
            }}
          >
            <div
              className="w-full h-full bg-no-repeat"
              style={{
                backgroundImage: `url(${images[activeIndex].large})`,
                backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                backgroundSize: `${zoomFactor * 100}%`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageZoom;