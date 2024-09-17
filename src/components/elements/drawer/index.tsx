import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import { IoMdClose } from "react-icons/io";

interface DrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: (onClose: () => void) => React.ReactNode;
  width?: string | number;
  position?: "left" | "right";
  closeIcon?: IconType;
  blurBackground?: boolean;
  borderRadius?: number;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onOpenChange,
  children,
  position = "right",
  closeIcon: CloseIcon = IoMdClose,
  blurBackground = false,
}) => {
  const drawerVariants = {
    open: { x: 0 },
    closed: { x: position === "right" ? "100%" : "-100%" },
  };

  const onClose = () => onOpenChange(false);

  // Prevent page scrolling when the drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to reset overflow when the component is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-black z-40 ${
              blurBackground ? "backdrop-filter backdrop-blur-sm" : ""
            }`}
            onClick={onClose}
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={{ duration: 0.3, type: "tween" }}
            className={`fixed top-0 ${position}-0 h-full w-[80%] md:w-[70%] lg:w-[40%] bg-white shadow-lg z-50 flex flex-col`}
          >
            <button
              title="close button"
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <CloseIcon size={24} />
            </button>
            <div className="flex flex-col h-[100vh]">
              {children(onClose)}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Drawer Content Components
export const DrawerContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-col h-[100vh]">{children}</div>;

export const DrawerHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div
    className={`p-4 border-b dark:border-b-gray-600 bg-slate-100 text-black dark:bg-slate-800 dark:text-gray-300 ${className}`}
  >
    {children}
  </div>
);

export const DrawerBody: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div
    className={`flex-1 bg-slate-100 text-black dark:bg-slate-800 dark:text-gray-300 p-4 ${className}`}
  >
    {children}
  </div>
);

export const DrawerFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div
    className={`p-4 border-t dark:border-t-gray-600 bg-slate-100 text-black dark:bg-slate-800 dark:text-gray-300 ${className}`}
  >
    {children}
  </div>
);

export default Drawer;