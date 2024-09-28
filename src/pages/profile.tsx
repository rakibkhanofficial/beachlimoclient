import React, { useEffect, useState } from "react";
import ProfileComponent from "~@/components/feature/Profile";
import { useCustomSession } from "~@/hooks/customSessionhook";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";
import { DriverDashboardLayout } from "~@/components/feature/DriverDashboard/layout/layout";

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
      {session?.user?.role === "Admin" ? (
        <AdminDashboardLayout
          children={
            <ProfileComponent
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              userDetails={userDetails}
              loading={loading}
            />
          }
        />
      ) : session?.user?.role === "Customer" ? (
        <UserDashboardLayout
          children={
            <ProfileComponent
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              userDetails={userDetails}
              loading={loading}
            />
          }
        />
      ) : (
        session?.user?.role === "Driver" && (
          <DriverDashboardLayout
            children={
              <ProfileComponent
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                userDetails={userDetails}
                loading={loading}
              />
            }
          />
        )
      )}
    </div>
  );
};

export default ProfilePage;
