import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "../../../../_redux/hooks/hooks";
import {
  handleChangeRegisterInput,
  handleErros,
  handleSubmitting,
} from "../../_redux/actions/auth-action";
import { postMethod } from "../../../../utils/api/postMethod";
import { endPoints } from "../../../../utils/api/route";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useDriverCreate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleretype, setIsVisibleRetype] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const { signUpError } = useAppSelector(
    (state) => state?.RegisterauthReducer?.registerauth?.errors,
  );
  const {
    email,
    password,
    phone,
    firstname,
    lastname,
    username,
    retypepassword,
  } = useAppSelector(
    (state) => state?.RegisterauthReducer?.registerauth?.registerInput,
  );

  const isSubmitting = useAppSelector(
    (state) => state?.RegisterauthReducer?.registerauth?.isSubmitting,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityRetype = () => setIsVisibleRetype(!isVisibleretype);

  const validateUserName = (username: string) => {
    const hasUppercase = /[A-Z]/.test(username);
    const hasLowercase = /[a-z]/.test(username);
    const hasDigit = /\d/.test(username);
    return hasUppercase && hasLowercase && hasDigit;
  };

  const validateFirstName = (firstname: string) => {
    const hasUppercase = /[A-Z]/.test(firstname);
    const hasLowercase = /[a-z]/.test(firstname);
    return hasUppercase && hasLowercase;
  };

  const validateLastName = (lastname: string) => {
    const hasUppercase = /[A-Z]/.test(lastname);
    const hasLowercase = /[a-z]/.test(lastname);
    return hasUppercase && hasLowercase;
  };

  const validatePhone = (phone: string) => {
    const hasDigit = /\d/.test(phone);
    return hasDigit;
  };

  const validateEmail = (email: string) =>
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const validatePassword = (email: string) => {
    const hasMinimumLength = email.length >= 8;
    const hasUppercase = /[A-Z]/.test(email);
    const hasLowercase = /[a-z]/.test(email);
    const hasDigit = /\d/.test(email);
    return hasMinimumLength && hasUppercase && hasLowercase && hasDigit;
  };

  const isInvalidusername = useMemo(() => {
    if (username === "") return false;

    return validateUserName(`${username}`) ? false : true;
  }, [username]);

  const isInvalidfirstName = useMemo(() => {
    if (firstname !== "") return false;

    return validateFirstName(`${firstname}`) ? false : true;
  }, [firstname]);

  const isInvalidLastName = useMemo(() => {
    if (lastname === "") return false;

    return validateLastName(`${lastname}`) ? false : true;
  }, [lastname]);

  const isInvalidPhone = useMemo(() => {
    if (phone === "") return false;

    return validatePhone(`${phone}`) ? false : true;
  }, [phone]);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(`${email}`) ? false : true;
  }, [email]);

  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;

    return validatePassword(`${password}`) ? false : true;
  }, [password]);

  const handleSignUpwithgoogle = async () => {
    await signIn("google");
  };

  const handleSignUpwithMicrosoft = async () => {
    await signIn("github");
  };

  const handleSignUp = async () => {
    setIsSignup(true);
    dispatch(handleSubmitting(true));
    try {
      const response = await postMethod({
        route: endPoints.auth.register,
        postData: {
          name: firstname,
          role: "Driver",
          email: email,
          image: "",
          phone: phone,
          password: password,
        },
      });
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message as string);
        setIsSignup(false);
        dispatch(handleChangeRegisterInput("firstname", ""));
        dispatch(handleChangeRegisterInput("phone", ""));
        dispatch(handleChangeRegisterInput("email", ""));
        dispatch(handleChangeRegisterInput("password", ""));
        dispatch(handleChangeRegisterInput("retypepassword", ""));
      } else {
        dispatch(handleErros("SignUpError", response.data.messgae));
        toast.error("Erorr Create Account Try Again", {
          duration: 3000,
          position: "top-center",
        });
        setIsSignup(false);
      }
    } catch (error) {
      console.error(error);
      dispatch(handleSubmitting(false));
      setIsSignup(false);
    }
  };

  return {
    isInvalid,
    isVisible,
    toggleVisibility,
    handleSignUp,
    isInvalidPassword,
    isInvalidusername,
    isInvalidfirstName,
    isInvalidLastName,
    isInvalidPhone,
    handleSignUpwithgoogle,
    handleSignUpwithMicrosoft,
    signUpError,
    isSubmitting,
    username,
    firstname,
    lastname,
    phone,
    email,
    password,
    isSignup,
    retypepassword,
    toggleVisibilityRetype,
    isVisibleretype,
  };
};
function handleChange(name: void, value: any): any {
  throw new Error("Function not implemented.");
}
