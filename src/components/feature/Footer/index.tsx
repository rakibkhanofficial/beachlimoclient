import React from "react";
import { Button, Link } from "@nextui-org/react";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa6";
import { TiArrowRepeatOutline } from "react-icons/ti";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 py-4 text-gray-300">
      <div className="container mx-auto px-4">
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
            <p>Flat Booking</p>
            <p>Construction</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-col">
            <Link>
              <h1 className=" cursor-pointer text-xl font-bold text-gray-300 ">
                Contact
              </h1>
            </Link>
            <p>Rampura,Dhaka</p>
            <p>+88012345-67891</p>
            <p>statebuilder@builderstate.com</p>
          </div>

          {/* Newsletter */}
          <div className=" flex flex-col items-center justify-center gap-6 lg:flex-col">
            <h1 className="text-xl font-bold lg:text-center">Newsletter</h1>
            <div className="relative max-w-xs sm:max-w-md">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className=" w-full rounded-md border-gray-300 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:rounded"
              />
              <Button
                color="primary"
                type="submit"
                className="absolute right-0 top-0 h-full"
              >
                Subscribe
              </Button>
            </div>
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
