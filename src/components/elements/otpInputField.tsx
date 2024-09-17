import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

type OtpInputFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  index: number;
  handlePaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  totalInputs: number;
};

const OtpInputField: React.FC<OtpInputFieldProps> = ({
  id,
  value,
  onChange,
  index,
  isInvalid,
  totalInputs,
  handlePaste,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (index === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [index]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(-1); // Only take the last character
    onChange(newValue);

    if (newValue && index < totalInputs - 1) {
      const nextInput = document.getElementById(
        `digit${index + 1}`
      ) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value && index > 0) {
      onChange("");
      const prevInput = document.getElementById(
        `digit${index - 1}`
      ) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };

  const animationVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    focus: { scale: 1.05, borderColor: "#4A90E2" },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileFocus="focus"
      variants={animationVariants}
      transition={{ duration: 0.2 }}
    >
      <input
        title="input"
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        className={`w-full text-black dark:text-white p-2 text-xl border-b-2 ${
          isInvalid ? "border-[#F31260]" : "border-[#33475B]"
        }  text-center  outline-none`}
        id={id}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onPaste={(e) => handlePaste(e)}
      />
    </motion.div>
  );
};

export default OtpInputField;
