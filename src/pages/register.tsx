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
      if (session?.user?.isAdmin === "false") {
        router.push("/userdashboard");
        // @ts-expect-error type error is not solved
      } else if (session?.user?.isAdmin === "true") {
        router.push("/admindashboard");
        // @ts-expect-error type error is not solved
      } else if (session?.user?.isAdmin === "driver") {
        router.push("/servicemandashboard");
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
