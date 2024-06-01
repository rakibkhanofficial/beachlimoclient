"use client";
import React from "react";
import Image from "next/image";
import { Button, Spinner } from "@nextui-org/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextInput from "../../elements/input/index";
import { handleChangeRegisterInput } from "../../../modules/auth/_redux/actions/auth-action";
import { useDriverCreate } from "~@/modules/auth/hocs/driverCreate/useDriverCreate";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const DriverCreate = () => {
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
  } = useDriverCreate();

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
      <div className=" flex items-center justify-center pb-20">
        <div className="flex flex-col items-center  justify-center gap-4 p-4 text-center">
          <div>
            <Image
              src="/BeachLimo.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "200px", height: "100px", objectFit: "contain" }}
            />
            <h1 className=" text-2xl font-medium text-black dark:text-white ">
              Create Driver Account Here
            </h1>
          </div>
          <form className="h-full w-full ">
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
                phone === "" &&
                password === "" &&
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
        </div>
      </div>
    </div>
  );
};

export default DriverCreate;
