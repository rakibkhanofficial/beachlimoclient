import { useState, useEffect } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

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
        <button
        className="bg-red-800 p-5 rounded-full fixed bottom-10 ml-10 hover:bg-green-800 "
          onClick={handleClick}
        >
          <FaRegArrowAltCircleUp fontSize="large" />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
