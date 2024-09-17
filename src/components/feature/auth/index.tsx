import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  Image,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./icons/eyesplashIcon";
import { EyeFilledIcon } from "./icons/eyefilledicon";
import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { MdArrowForwardIos } from "react-icons/md";
import OtpInputField from "~@/components/elements/otpInputField";
import { FaCheckCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import { handleAuthSubmitting } from "~@/_redux/actions/authopen";

interface PasswordStrength {
  hasEightCharacters: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AuthModule = () => {
  //login
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLoginModalOpen: boolean = useAppSelector(
    (state) => state?.isloginauthOpenReducer?.authopen?.isSubmitting
  );
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  // sign up
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  //Reset Password
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState<boolean>(false);
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const totalInputs = 6;
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const handleResetPasswordComponent = () => {
    setIsResetPasswordModalOpen(true);
    dispatch(handleAuthSubmitting(false));
  };

  const handleLoginComponent = () => {
    setIsResetPasswordModalOpen(!isResetPasswordModalOpen);
    dispatch(handleAuthSubmitting(true));
  };

  const handleSignupComponent = () => {
    setIsSignUp(true);
  };

  const handleLoginComponeent = () => {
    setIsSignUp(false);
  };

  const validateEmail = (email: string) =>
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(`${email}`) ? false : true;
  }, [email]);

  const checkPasswordStrength = (input: string): PasswordStrength => {
    const hasEightCharacters = input.length >= 8;
    const hasLowerCase = /[a-z]/.test(input);
    const hasUpperCase = /[A-Z]/.test(input);
    const hasNumber = /[0-9]/.test(input);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]/.test(input);

    return {
      hasEightCharacters,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSymbol,
    };
  };

  const passwordStrength: PasswordStrength = password
    ? checkPasswordStrength(`${password}`)
    : {
        hasEightCharacters: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSymbol: false,
      };

  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;
    const {
      hasEightCharacters,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSymbol,
    } = checkPasswordStrength(`${password}`);
    return !(
      hasEightCharacters &&
      hasLowerCase &&
      hasUpperCase &&
      hasNumber &&
      hasSymbol
    );
  }, [password]);

  const validatePhone = (phone: string) => {
    const hasDigit = /\d{10}$/.test(phone);
    return hasDigit;
  };

  const isInvalidPhone = useMemo(() => {
    if (phone === "") return false;

    return validatePhone(`${phone}`) ? false : true;
  }, [phone]);

  const validateUserName = (username: string) => {
    const hasUppercase = /[A-Z]/.test(username);
    const hasLowercase = /[a-z]/.test(username);
    const hasDigit = /\d/.test(username);
    return hasUppercase && hasLowercase && hasDigit;
  };

  const isInvalidusername = useMemo(() => {
    if (username === "") return false;

    return validateUserName(`${username}`) ? false : true;
  }, [username]);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleUserLogin = async () => {
    setIsLogin(true);
    try {
      const response = await postMethod({
        route: endPoints?.auth?.login,
        postData: {
          email: email,
          password: password,
        },
      });
      if (response?.data?.statusCode === 200) {
        await signIn("credentials", {
          ...response?.data?.user,
          redirect: false,
        });
        setIsLogin(false);
        dispatch(handleAuthSubmitting(false));
        // Save credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          // Remove saved credentials if "Remember Me" is unchecked
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }
      } else {
        setIsLogin(false);
        console.error("Error logging in:", response?.data?.message);
        toast.error(response?.data?.message as string);
      }
    } catch (error: unknown) {
      setIsLogin(false);
      const customError = error as CustomError;
      console.error("Error logging in:", customError?.response?.data?.message);
      toast.error(customError?.response?.data?.message || "An error occurred");
    }
  };

  const handleSignup = async () => {
    setIsSignedIn(true);
    try {
      const response = await postMethod({
        route: endPoints?.auth?.register,
        postData: {
          name: username,
          role: "Customer",
          email: email,
          image: "",
          phone: phone,
          password: password,
        },
      });
      if (response?.data?.statusCode === 200) {
        const response = await postMethod({
          route: endPoints?.auth?.login,
          postData: {
            email: email,
            password: password,
          },
        });
        if (response?.data?.statusCode === 200) {
          await signIn("credentials", {
            ...response?.data?.user,
            redirect: false,
          });
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
          setIsSignedIn(false);
          dispatch(handleAuthSubmitting(false));
        } else {
          setIsSignedIn(false);
          console.error("Error logging in:", response?.data?.message);
        }
      } else {
        setIsSignedIn(false);
        console.error("Error signing up:", response?.data?.message);
        toast.error(response?.data?.message as string);
      }
    } catch (error: unknown) {
      setIsSignedIn(false);
      const customError = error as CustomError;
      console.error("Error signing up:", customError?.response?.data?.message);
      toast.error(customError?.response?.data?.message || "An error occurred");
    }
  };

  const handleSignUpwithgoogle = async () => {
    await signIn("google");
  };

  const handleSignUpwithFacebook = async () => {
    await signIn("facebook");
  };

  const isInvalidConfirmPassword = useMemo(() => {
    if (password === "" || confirmPassword === "") return false;

    return password !== confirmPassword ? true : false;
  }, [password, confirmPassword]);

  const handleStepChanges = async () => {
    setIsPasswordReset(true);
    if (step === 1) {
      try {
        const response = await postMethod({
          route: endPoints?.auth?.sendOtp,
          postData: {
            email: email,
          },
        });
        if (response?.data?.statusCode === 200) {
          setStep((prevStep) => prevStep + 1);
          toast.success("OTP sent successfully!");
          setIsPasswordReset(false);
        } else {
          console.error("Error sending OTP:", response?.data?.message);
          toast.error(response?.data?.message as string);
          setIsPasswordReset(false);
        }
      } catch (error: unknown) {
        const customError = error as CustomError;
        console.error(
          "Error sending OTP:",
          customError?.response?.data?.message
        );
        toast.error(
          customError?.response?.data?.message || "An error occurred"
        );
        setIsPasswordReset(false);
      }
    } else if (step === 2) {
      try {
        const response = await postMethod({
          route: endPoints?.auth?.verifyOtp,
          postData: {
            email: email,
            otp: Number(otp.join("")),
          },
        });
        if (response?.data?.statusCode === 200) {
          toast.success("OTP verified successfully!");
          setStep((prevStep) => prevStep + 1);
          setIsPasswordReset(false);
        } else {
          console.error("Error verifying OTP:", response?.data?.message);
          toast.error(response?.data?.message as string);
          setIsPasswordReset(false);
        }
      } catch (error: unknown) {
        const customError = error as CustomError;
        console.error(
          "Error verifying OTP:",
          customError?.response?.data?.message
        );
        toast.error(
          customError?.response?.data?.message || "An error occurred"
        );
        setIsPasswordReset(false);
      }
    } else if (step === 3) {
      try {
        const response = await postMethod({
          route: endPoints?.auth?.updatePassword,
          postData: {
            email: email,
            otp: Number(otp.join("")),
            newPassword: confirmPassword,
          },
        });
        if (response?.data?.statusCode === 200) {
          toast.success("Password updated successfully!");
          setIsResetPasswordModalOpen(!isResetPasswordModalOpen);
          setIsPasswordReset(false);
          dispatch(handleAuthSubmitting(false));
        } else {
          console.error("Error updating password:", response?.data?.message);
          toast.error(response?.data?.message as string);
          setIsPasswordReset(false);
        }
      } catch (error: unknown) {
        const customError = error as CustomError;
        console.error(
          "Error updating password:",
          customError?.response?.data?.message
        );
        toast.error(
          customError?.response?.data?.message || "An error occurred"
        );
        setIsPasswordReset(false);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData =
      event.clipboardData || (await navigator.clipboard.readText());
    const pastedText = clipboardData.getData("text");

    if (/^\d+$/.test(pastedText)) {
      const digits = pastedText.split("").slice(0, 6); // Limit to 6 digits
      const newOtp = [...otp];
      digits.forEach((digit, digitIndex) => {
        newOtp[digitIndex] = digit;
      });
      setOtp(newOtp);
    }
    event.preventDefault();
  };

  return (
    <>
      <Button
        as={Link}
        color="primary"
        href="#"
        variant="flat"
        onPress={() => dispatch(handleAuthSubmitting(true))}
      >
        Login
      </Button>
      <Modal
        isOpen={isLoginModalOpen}
        onOpenChange={() => dispatch(handleAuthSubmitting(false))}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-black dark:text-white flex-col gap-1">
                {isSignUp === false ? "Log In" : "Sign Up"}
              </ModalHeader>
              <ModalBody>
                <div>
                  {isSignUp === false ? (
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="flex flex-col justify-center items-center gap-1 w-full">
                        <Input
                          isClearable
                          type="email"
                          label="Email"
                          variant="bordered"
                          placeholder="Enter your email"
                          onClear={() => setEmail("")}
                          value={email}
                          isRequired
                          isInvalid={isEmailInvalid}
                          className="text-black dark:text-white"
                          errorMessage="Please Enter a valid email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          label="Password"
                          variant="bordered"
                          isRequired
                          placeholder="Enter your password"
                          value={password}
                          isInvalid={isInvalidPassword}
                          className="text-black dark:text-white"
                          errorMessage="Please Enter a valid Password"
                          onChange={(e) => setPassword(e.target.value)}
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon />
                              ) : (
                                <EyeFilledIcon />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                        />
                      </div>
                      <div className="flex py-2 px-1 justify-between w-full">
                        <Checkbox
                          classNames={{
                            label: "text-small",
                          }}
                          isSelected={rememberMe}
                          onValueChange={setRememberMe}
                        >
                          Remember me
                        </Checkbox>
                        <button
                          type="button"
                          onClick={handleResetPasswordComponent}
                          title="restore password"
                          className="text-blue-700 hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className=" my-1 ">
                        <p className="text-small text-gray-600">
                          By continuing, you agree to our{" "}
                          <Link
                            href="#"
                            className="text-blue-700 hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#"
                            className="text-blue-700 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                      <div className="w-full my-1 flex justify-center items-center">
                        <Button
                          className="w-[60%]"
                          color="success"
                          variant={
                            email === "" || password === "" ? "ghost" : "solid"
                          }
                          isDisabled={
                            email === "" ||
                            password === "" ||
                            isEmailInvalid === true ||
                            isInvalidPassword === true
                          }
                          onClick={handleUserLogin}
                          isLoading={isLogin}
                        >
                          Log In
                        </Button>
                      </div>
                      <div>
                        <p className="text-small text-gray-600">
                          Don't have an account?{" "}
                          <Link
                            as={"button"}
                            href="#"
                            className="text-blue-700 hover:underline"
                            onClick={handleSignupComponent}
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col justify-center items-center gap-1">
                      <div className="w-full grid lg:grid-cols-2 2xl:grid-cols-1 gap-1 ">
                        <Input
                          isClearable
                          onClear={() => setUserName("")}
                          type="text"
                          label="User Name"
                          variant="bordered"
                          placeholder="Enter your User Name"
                          className="text-black dark:text-white"
                          errorMessage="Please Enter a valid User Name"
                          isRequired
                          isInvalid={isInvalidusername}
                          onChange={(e) => setUserName(e.target.value)}
                          value={username}
                        />
                        <Input
                          isClearable
                          onClear={() => setPhone("")}
                          type="text"
                          label="Phone"
                          variant="bordered"
                          placeholder="Enter your Phone"
                          className="text-black dark:text-white"
                          isInvalid={isInvalidPhone}
                          errorMessage="Please Enter a valid Phone Number"
                          isRequired
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                        />

                        <Input
                          isClearable
                          type="email"
                          label="Email"
                          variant="bordered"
                          placeholder="Enter your email"
                          onClear={() => setEmail("")}
                          isInvalid={isEmailInvalid}
                          className="text-black dark:text-white"
                          errorMessage="Please Enter a valid email"
                          value={email}
                          isRequired
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          label="Password"
                          variant="bordered"
                          isRequired
                          placeholder="Enter your password"
                          value={password}
                          isInvalid={isInvalidPassword}
                          className="text-black dark:text-white"
                          errorMessage="Please Enter a valid Password"
                          onChange={(e) => setPassword(e.target.value)}
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon />
                              ) : (
                                <EyeFilledIcon />
                              )}
                            </button>
                          }
                          type={isVisible ? "text" : "password"}
                        />
                      </div>
                      <div className="text-black grid grid-cols-2 text-tiny dark:text-white">
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasEightCharacters ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least 8 characters
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasLowerCase ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one lowercase character
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasUpperCase ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one uppercase character
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasNumber ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one number
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasSymbol ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one symbol or whitespace character
                        </div>
                      </div>
                      <div className=" my-1 ">
                        <p className="text-small text-gray-600">
                          By continuing, you agree to our{" "}
                          <Link
                            href="#"
                            className="text-blue-700 hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#"
                            className="text-blue-700 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                      <Button
                        className="w-[60%]"
                        color="secondary"
                        variant="shadow"
                        isDisabled={
                          email === "" ||
                          password === "" ||
                          phone === "" ||
                          username === "" ||
                          isInvalidusername === true ||
                          isInvalidPhone === true ||
                          isEmailInvalid === true ||
                          isInvalidPassword === true
                        }
                        isLoading={isSignedIn}
                        onClick={handleSignup}
                      >
                        Create Account
                      </Button>
                      <div>
                        <p className="text-center text-gray-600 text-small">
                          Already have an account?{" "}
                          <Link
                            href="#"
                            as={"button"}
                            className="text-blue-700 hover:underline"
                            onClick={handleLoginComponeent}
                          >
                            Log In
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  <div className=" flex justify-center my-3 gap-10 items-center ">
                    <div
                      onClick={handleSignUpwithFacebook}
                      className=" cursor-pointer "
                    >
                      <Image
                        src="/icon/facebook.png"
                        width={30}
                        height={30}
                        alt="facebook"
                        isZoomed={false}
                      />
                    </div>
                    <div
                      onClick={handleSignUpwithgoogle}
                      className=" cursor-pointer "
                    >
                      <Image
                        src="/icon/google.png"
                        width={30}
                        height={30}
                        alt="google"
                        isZoomed={false}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isResetPasswordModalOpen}
        onOpenChange={() =>
          setIsResetPasswordModalOpen(!isResetPasswordModalOpen)
        }
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-black dark:text-white flex-col gap-1">
                Reset Password
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center w-full">
                  {step === 1 && (
                    <Input
                      isClearable
                      type="email"
                      label="Email"
                      variant="bordered"
                      placeholder="Enter your email"
                      onClear={() => setEmail("")}
                      value={email}
                      isRequired
                      isInvalid={isEmailInvalid}
                      className="text-black dark:text-white"
                      errorMessage="Please Enter a valid email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                  {step === 2 && (
                    <div className=" flex flex-col gap-3 px-4 my-3 ">
                      <div className="flex flex-col w-full justify-center gap-2">
                        <label className=" text-black text-center dark:text-white">
                          Enter Verification code
                        </label>
                        <div className="flex space-x-2">
                          {otp.map((digit, index) => (
                            <OtpInputField
                              key={index}
                              id={`digit${index}`}
                              value={digit}
                              onChange={(value) =>
                                handleOtpChange(index, value)
                              }
                              index={index}
                              isInvalid={false}
                              totalInputs={totalInputs}
                              handlePaste={handlePaste}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        {otp.join("")?.length > 0 &&
                          otp.join("")?.length < 6 && (
                            <span className="text-sm text-[#F31260]">
                              Your OTP should be composed of 6 numbers.
                            </span>
                          )}
                      </div>
                      <div className="w-full flex justify-between items-center text-sm">
                        <div className=" text-black dark:text-white ">{`Didn't get the OTP?`}</div>
                        <button
                          onClick={() => setStep((prevStep) => prevStep - 1)}
                          title="resend"
                          type="button"
                          className="ml-1 text-blue-500 dark:text-white hover:underline font-semibold"
                        >
                          Resend
                        </button>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="w-ful text-black dark:text-whitel">
                      <Input
                        isClearable
                        type="password"
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        isRequired
                        value={password}
                        isInvalid={isInvalidPassword}
                        onClear={() => setPassword("")}
                        className="text-black w-full dark:text-white"
                        errorMessage="Please Enter a valid Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="text-black grid grid-cols-2 gap-2 dark:text-white">
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasEightCharacters ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least 8 characters
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasLowerCase ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one lowercase character
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasUpperCase ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one uppercase character
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasNumber ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one number
                        </div>
                        <div className="flex items-center gap-2">
                          {passwordStrength.hasSymbol ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaCheckCircle className="text-red-500" />
                          )}
                          At least one symbol or whitespace character
                        </div>
                      </div>
                      <Input
                        isClearable
                        type="password"
                        label="Confirm Password"
                        variant="bordered"
                        placeholder="Confirm your password"
                        isRequired
                        value={confirmPassword}
                        isInvalid={isInvalidConfirmPassword}
                        className="text-black w-full dark:text-white"
                        errorMessage="Password does not match"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onClear={() => setConfirmPassword("")}
                      />
                    </div>
                  )}
                  {step === 1 && (
                    <Button
                      endContent={<MdArrowForwardIos />}
                      color="primary"
                      variant="solid"
                      onClick={handleStepChanges}
                      className="w-[60%]"
                      isLoading={isPasswordReset}
                      isDisabled={isEmailInvalid || email === ""}
                    >
                      Next
                    </Button>
                  )}
                  {step === 2 && (
                    <Button
                      endContent={<MdArrowForwardIos />}
                      color="primary"
                      variant="solid"
                      onClick={handleStepChanges}
                      className="w-[60%]"
                      isLoading={isPasswordReset}
                      isDisabled={
                        otp.join("")?.length < 6 || otp.join("") === ""
                      }
                    >
                      Next
                    </Button>
                  )}
                  {step === 3 && (
                    <Button
                      endContent={<MdArrowForwardIos />}
                      color="primary"
                      variant="solid"
                      onClick={handleStepChanges}
                      className="w-[60%]"
                      isLoading={isPasswordReset}
                      isDisabled={
                        isInvalidPassword ||
                        isInvalidConfirmPassword ||
                        password === "" ||
                        confirmPassword === ""
                      }
                    >
                      Next
                    </Button>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                {step === 1 && (
                  <Button onClick={handleLoginComponent} color="primary">
                    Log In
                  </Button>
                )}
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() =>
                    setIsResetPasswordModalOpen(!isResetPasswordModalOpen)
                  }
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModule;
