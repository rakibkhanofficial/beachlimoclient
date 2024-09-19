import React, { useEffect, useState } from "react";
import HeaderLandingPage from "~@/components/feature/Header";
import FooterComponent from "~@/components/feature/Footer";
import ProfileComponent from "~@/components/feature/Profile";
import { useCustomSession } from "~@/hooks/customSessionhook";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";

type UserDetails = {
  name: string;
  phone: string;
  email: string;
  image: string | null;
  birthdaydate: string | undefined;
  homeaddress: string | null | undefined;
  officeadress: string | null | undefined;
  createdAt: string;
  updatedAt: string;
};

const ProfilePage = () => {
  const { session } = useCustomSession();
  const userId = Number(session?.user?.userId);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await getMethod(
          endPoints?.user?.getUserDetailsById(userId),
        );
        if (response?.data?.statusCode === 200) {
          setUserDetails(response?.data?.data as UserDetails);
          setLoading(false);
        } else {
          console.error(
            "Error fetching user details:",
            response?.data?.message,
          );
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUserDetails();
    }
  }, [userId, isEditing]);

  return (
    <div className=" bg-gray-100 text-black dark:bg-slate-900 dark:text-gray-100 ">
      <div className=" h-16 md:h-10 ">
        <HeaderLandingPage />
      </div>
      <div className="w-full min-h-[70vh] px-2 py-4 lg:p-10 lg:grid lg:grid-cols-2">
      <ProfileComponent
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        userDetails={userDetails}
        loading={loading}
      />
      </div>
      <footer className="w-full">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default ProfilePage;
