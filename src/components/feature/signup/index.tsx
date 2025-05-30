"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { Checkbox } from "@nextui-org/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextInput from "../../elements/input/index";
import { handleChangeRegisterInput } from "../../../modules/auth/_redux/actions/auth-action";
import { useSignup } from "../../../modules/auth/hocs/signup/useSignup";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const UserSignUp = () => {
  const {
    isInvalid,
    email,
    signUpError,
    isVisible,
    password,
    retypepassword,
    phone,
    firstname,
    lastname,
    username,
    toggleVisibility,
    toggleVisibilityRetype,
    handleSignUp,
    isInvalidPassword,
    isInvalidusername,
    isInvalidfirstName,
    isInvalidLastName,
    isInvalidPhone,
    handleSignUpwithgoogle,
    handleSignUpwithMicrosoft,
    isSubmitting,
    isSignup,
    isVisibleretype,
  } = useSignup();

  // const router = useRouter();
  // const { data: session, status } = useSession();

  const isPasswordNotMatched = retypepassword !== password;

  // useEffect(() => {
  //   if (session?.user) {
  //     // @ts-expect-error type error is not solved
  //     if (session?.user?.role === "Customer") {
  //       router.replace("/userdashboard");
  //       // @ts-expect-error type error is not solved
  //     } else if (session?.user?.role === "Admin") {
  //       router.replace("/admindashboard");
  //       // @ts-expect-error type error is not solved
  //     } else if (session?.user?.role === "Service-man") {
  //       router.replace("/servicemandashboard");
  //     }
  //   }
  // }, [status, session, router]);

  return (
    <div className=" w-full bg-white dark:bg-gray-800">
      <div className=" px-5 md:px-10 lg:px-20 underline pt-2 ">
        <Link className="text-black dark:text-white" href="/">
          Go Back
        </Link>
      </div>
      <div className=" flex items-center justify-center pb-20">
      <div className="flex w-full md:w-[70%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] flex-col items-center  justify-center gap-4 p-4 text-center">
          <div>
            <Image
              src="/BeachLimo.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "200px", height: "100px", objectFit: "contain" }}
            />
          </div>
          <h1 className=" text-2xl font-medium text-black dark:text-white ">
              Register Here For Booking
            </h1>
          <h1 className="text-black dark:text-white">
            {`have an account?`}
            <span className="pl-1">
              <Link
                className="font-semibold text-black hover:underline dark:text-white"
                href="/login"
              >
                Log In
              </Link>
            </span>
          </h1>
          <form className="h-full w-full my-2 ">
            {/* <TextInput
              type="text"
              isInvalid={isInvalidusername}
              color={isInvalidusername ? "danger" : "default"}
              errorMessage={"Enter your Your Username"}
              name="username"
              variant="underlined"
              label="User Name"
              value={username}
              size="lg"
              handleChange={handleChangeRegisterInput}
            /> */}
            <TextInput
              type="text"
              isInvalid={isInvalidfirstName}
              color={isInvalidfirstName ? "danger" : "default"}
              errorMessage={"Enter your Name"}
              name="firstname"
              variant="underlined"
              label="Name"
              value={firstname}
              size="lg"
              handleChange={handleChangeRegisterInput}
            />
            <TextInput
              type="text"
              isInvalid={isInvalidPhone}
              color={isInvalidPhone ? "danger" : "default"}
              errorMessage={"Enter Phone"}
              name="phone"
              variant="underlined"
              label="Phone"
              value={phone}
              size="lg"
              handleChange={handleChangeRegisterInput}
            />
            <TextInput
              type="email"
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "default"}
              errorMessage={"Please enter a valid email"}
              name="email"
              variant="underlined"
              label="Email address"
              value={email}
              size="lg"
              handleChange={handleChangeRegisterInput}
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
              handleChange={handleChangeRegisterInput}
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
            <TextInput
              type={isVisibleretype ? "text" : "password"}
              label="Re-Type Password"
              color={isInvalidPassword ? "danger" : "default"}
              isInvalid={isInvalidPassword}
              errorMessage="Please enter valid Password"
              name="retypepassword"
              variant="underlined"
              value={retypepassword}
              handleChange={handleChangeRegisterInput}
              size="lg"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityRetype}
                >
                  {isVisibleretype ? (
                    <FaEye className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
            />
          </form>
          {/* <div className="flex w-full">
            <Checkbox>Remember Me</Checkbox>
          </div> */}
          {signUpError && <p className="text-red-500">{signUpError}</p>}
          <Button
            size="lg"
            onClick={handleSignUp}
            className={`w-full rounded-md font-semibold ${
              !isInvalid &&
              !isInvalidPassword &&
              email !== "" &&
              phone !== "" &&
              password !== "" &&
              firstname !== "" &&
              !isPasswordNotMatched
                ? "bg-[#3f2de2] text-white"
                : "cursor-not-allowed"
            }`}
            disabled={
              isSignup ||
              isInvalid ||
              (isInvalidPassword &&
                firstname === "" &&
                email === "" &&
                password === "" &&
                phone === "" &&
                isPasswordNotMatched === false) ||
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
            {isSignup ? <Spinner color="warning" size="md" /> : "Create Account"}
          </Button>
          {/* <Link className="flex w-full hover:underline" href="/forget-password">
              Forgot My Password
            </Link> */}
          <div className="flex w-full flex-col justify-center items-center gap-4 sm:flex-row">
          <button
              title="Sign Up"
              type="button"
              onClick={handleSignUpwithgoogle}
              className=" flex w-full flex-col justify-center items-center cursor-pointer rounded-md bg-[#4285F4] px-3 py-1 font-medium text-white"
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

export default UserSignUp;
