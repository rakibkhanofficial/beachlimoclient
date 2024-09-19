import React, { useState, ChangeEvent } from "react";
import { Button, Link } from "@nextui-org/react";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa6";
import { TiArrowRepeatOutline } from "react-icons/ti";
import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import toast from "react-hot-toast";

const FooterComponent: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [subscribeemail, setSubscribeemail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setSubscribeemail(email);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleCreateSubscribeEmail = async () => {
    if (emailError) {
      return;
    }
    try {
      const response = await postMethod({
        route: endPoints?.Subscribe?.CreateSubsribe,
        postData: { email: subscribeemail },
      });
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message);
        setSubscribeemail("");
      } else {
        toast.error(response?.data?.error);
        setSubscribeemail("");
      }
    } catch (error) {
      console.error(error);
      // @ts-expect-error type error is not solved
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <footer className="bg-gray-900 py-4 text-gray-300">
      <div className=" mx-auto px-4">
        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {/* Schems */}
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-col">
            <Link>
              <h1 className="cursor-pointer text-xl font-bold text-gray-300">
                Schems
              </h1>
            </Link>
            <p>Corporate</p>
            <p>Business</p>
            <p>Consulting</p>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-col">
            <Link>
              <h1 className="cursor-pointer text-xl font-bold text-gray-300">
                Services
              </h1>
            </Link>
            <p>Services</p>
            <p>Car Booking</p>
            <p>Rent Services</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-col">
            <Link>
              <h1 className=" cursor-pointer text-xl font-bold text-gray-300 ">
                Contact
              </h1>
            </Link>
            <p>Caloforniya,USA</p>
            <p>{`+1(646) 517-4942`}</p>
            <p>support@beachLimo.com</p>
          </div>

          {/* Newsletter */}
          <div className=" flex flex-col items-center justify-center gap-6 lg:flex-col">
            <h1 className="text-xl font-bold lg:text-center">Newsletter</h1>
            <div className="flex max-w-xs sm:max-w-md">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={subscribeemail}
                onChange={handleEmailChange}
                className=" w-full text-black rounded-md border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:rounded"
              />
              <button
                type="button"
                onClick={handleCreateSubscribeEmail}
                disabled={!!emailError}
                className={`h-full px-3 py-2 bg-blue-700 text-white rounded-r-md ${emailError ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                Subscribe
              </button>
            </div>
            {emailError && (
              <p className="text-red-500 mt-2">{emailError}</p>
            )}
            <div className="mt-2 flex justify-center gap-2">
              <FaCcVisa className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
              <FaCcMastercard className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
              <FaPaypal className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
            </div>
          </div>
        </div>
        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <div className=" mx-auto grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 ">
          <div className=" flex items-center justify-center gap-1 ">
            <TiArrowRepeatOutline />

            <h1>Beach Limo</h1>
          </div>
          <div className=" flex items-center justify-center gap-1 ">
            <h1>&copy;{currentYear} </h1>
            <p>Privacy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
