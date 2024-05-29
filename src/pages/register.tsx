import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
      <UserSignUp />
    </div>
  );
};

export default UserRegister;
