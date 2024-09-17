import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import { signOut } from "next-auth/react";

const UseLogout = () => {
  const handleLogout = async () => {
    try {
      const response = await postMethod({
        route: endPoints.auth.logout,
        postData: "",
      });
      if (response?.data?.statusCode === 200) {
        await signOut({
          callbackUrl: "/",
        });
      } else {
        console.error(response?.data?.message);
        await signOut({
          callbackUrl: "/",
        });
      }
    } catch (error) {
      console.error(error);
      await signOut({
        callbackUrl: "/",
      });
    }
  };

  return {
    handleLogout,
  };
};

export default UseLogout;
