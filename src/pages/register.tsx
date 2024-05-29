import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FooterComponent from "~@/components/feature/Footer";
import HeaderLandingPage from "~@/components/feature/Header";
import UserSignUp from "~@/components/feature/signup";

const UserRegister = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      // @ts-expect-error type error is not solved
      if (session?.user?.role === "Customer") {
        router.push("/userdashboard");
        // @ts-expect-error type error is not solved
      } else if (session?.user?.role === "Admin") {
        router.push("/admindashboard");
        // @ts-expect-error type error is not solved
      } else if (session?.user?.role === "Driver") {
        router.push("/driverdashboard");
      }
    }
  }, [session, router]);

  return (
    <div>
      <HeaderLandingPage />
      <UserSignUp />
      <FooterComponent />
    </div>
  );
};

export default UserRegister;
