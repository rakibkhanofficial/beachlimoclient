import { useState, useEffect } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { Button } from "@nextui-org/react";


const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <Button
          onClick={handleClick}
        >
          <FaRegArrowAltCircleUp fontSize="large" />
        </Button>
      )}
    </>
  );
};

export default GoToTopButton;
