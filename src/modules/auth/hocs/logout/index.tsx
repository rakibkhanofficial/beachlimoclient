import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
import Cookies from "universal-cookie";
// import { postMethod } from "~@/utils/api/postMethod";
// import { endPoints } from "~@/utils/api/route";

const UseLogout = () => {
  // const { data: session } = useSession();
  const cookies = new Cookies();

  // const handleSignOut = async () => {
  //   await postMethod({
  //     route: endPoints.auth.logout,
  //     postData: {
  //       credential: session?.user?.email,
  //     },
  //   })
  //     .then(async (response) => {
  //       // console.log(response)
  //       if (response?.data?.data?.statusCode !== 200) {
  //         await signOut({
  //           callbackUrl: "/login",
  //         });
  //         cookies.set("accesstoken", null);
  //         cookies.set("refreshToken", null);
  //       } else {
  //         // console.error(response?.data)
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });
    cookies.set("accesstoken", null);
    cookies.set("refreshToken", null);
  }

  return {
    handleSignOut,
  };
};

export default UseLogout;
