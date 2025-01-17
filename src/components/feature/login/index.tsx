"use client";
import React from "react";
import Image from "next/image";
import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { Checkbox } from "@nextui-org/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextInput from "../../../components/elements/input";
import { useLogin } from "../../../modules/auth/hocs/login/useLogin";
import { handleChangeLogInput } from "../../../modules/auth/_redux/actions/login-auth-actions";

const UserLogin = () => {
  const {
    isInvalid,
    emailorphone,
    loginError,
    isVisible,
    password,
    toggleVisibility,
    handleLogin,
    isInvalidPassword,
    handleSignUpwithgoogle,
    handleSignUpwithMicrosoft,
    isSubmitting,
    isLogin,
  } = useLogin();

  return (
    <div className=" w-full dark:bg-slate-900 dark:text-white bg-white text-black">
      <div className=" pt-5 px-5 md:px-10 lg:px-20 underline ">
        <Link href="/">Go Back</Link>
      </div>
      <div className=" flex items-center justify-center pb-5 md:pb-10 lg:pb-20">
      <div className="flex w-full md:w-[70%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] flex-col items-center  justify-center gap-4 p-4 text-center">
          <div>
            <Image
              src="/BeachLimo.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              priority={true}
              style={{ width: "200px", height: "100px", objectFit: "contain" }}
            />
          </div>
          <h1 className=" text-2xl font-medium text-black dark:text-white "> Log In Here For Booking</h1>
          <h1>
            {`Don't have account?`}
            <span className="pl-1">
              <Link className="font-semibold hover:underline" href="/register">
                Register
              </Link>
            </span>
          </h1>
          <form className="h-full w-full ">
            <TextInput
              type="text"
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "default"}
              errorMessage={"Please enter email"}
              name="emailorphone"
              variant="underlined"
              label="Email"
              value={emailorphone}
              size="lg"
              handleChange={handleChangeLogInput}
            />
            <TextInput
              type={isVisible ? "text" : "password"}
              label="Password"
              color={isInvalidPassword ? "danger" : "default"}
              isInvalid={isInvalidPassword}
              errorMessage="Please enter valid Password"
              name="password"
              variant="underlined"
              value={password}
              handleChange={handleChangeLogInput}
              size="lg"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEye className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
            />
          </form>
          <div className="flex w-full">
            <Checkbox>Remember Me</Checkbox>
          </div>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <Button
            size="lg"
            onClick={handleLogin}
            className={`w-full rounded-md font-semibold ${
              !isInvalid &&
              !isInvalidPassword &&
              emailorphone !== "" &&
              password !== ""
                ? "bg-[#21865c] text-white"
                : "cursor-not-allowed"
            }`}
            disabled={
              isLogin ||
              isInvalid ||
              isInvalidPassword ||
              emailorphone == "" ||
              password == "" ||
              isSubmitting
            }
            endContent={
              isSubmitting ? (
                <Spinner color="warning" size="sm" />
              ) : (
                <IoIosArrowForward />
              )
            }
          >
            {isLogin ? <Spinner size="md" /> : "Log In"}
          </Button>
          <Link className="flex w-full hover:underline" href="/forget-password">
            Forgot My Password
          </Link>
          <div className="flex w-full flex-col justify-center items-center gap-4 sm:flex-row">
            <button
              title="google"
              type="button"
              onClick={handleSignUpwithgoogle}
              className=" flex flex-col justify-center w-full items-center cursor-pointer rounded-md bg-[#4285F4] px-3 py-1 font-medium text-white"
            >
              <Image
                src="/assets/auth/google.png"
                alt="Google"
                height={20}
                width={20}
                className="rounded-full"
              />
              <span className="col-span-6"> Try with Google</span>
            </button>
            {/* <button
              title="Sign Up"
              type="button"
              onClick={handleSignUpwithMicrosoft}
              className="grid w-full cursor-pointer grid-cols-7 whitespace-nowrap rounded-md bg-[#2F2F2F] px-3 py-2 font-medium text-white"
            >
              <Image
                src="/assets/auth/github.png"
                alt="Github"
                height={24}
                width={24}
              />
              <span className="col-span-6">Github</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
