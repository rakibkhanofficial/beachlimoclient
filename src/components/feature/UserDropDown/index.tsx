import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCustomSession } from "~@/hooks/customSessionhook";
import UseLogout from "~@/hooks/useLogout";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";

type UserDetails = {
  name: string;
  phone: string;
  email: string;
  image: string | null;
  birthdaydate: string | null | undefined;
  homeaddress: string | null | undefined;
  officeadress: string | null | undefined;
  createdAt: string;
  updatedAt: string;
};

export const UserDropdown = () => {
  const { handleLogout } = UseLogout();
  const { session } = useCustomSession();
  const userId = Number(session?.user?.userId);
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails,
  );
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getMethod(
          endPoints?.user?.getUserDetailsById(userId),
        );
        if (response?.data?.statusCode === 200) {
          setUserDetails(response?.data?.data as UserDetails);
        } else {
          console.error(
            "Error fetching user details:",
            response?.data?.message,
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (session?.user) {
      fetchUserDetails();
    }
  }, [session?.user]);

  return (
    <div className="cursor-pointer">
      <div className="hidden md:inline">
        <Dropdown>
          <NavbarItem>
            <Badge
              content=""
              color="success"
              shape="circle"
              placement="top-right"
            >
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  name={userDetails?.name}
                  size="md"
                  src={userDetails?.image ? userDetails?.image : "/avatar.png"}
                />
              </DropdownTrigger>
            </Badge>
          </NavbarItem>
          <DropdownMenu
            className="text-black dark:text-white"
            aria-label="Profile Actions"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-black dark:text-white">
                Signed in as
              </p>
              <p className="font-semibold text-black dark:text-white">
                {userDetails?.email}
              </p>
            </DropdownItem>
            {pathname !== "/userdashboard" &&
            session?.user?.role === "Customer" ? (
              <DropdownItem href="/userdashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname !== "/admindashboard" &&
              session?.user?.role === "Admin" ? (
              <DropdownItem href="/admindashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname === "/driverdashboard" &&
              session?.user?.role !== "Driver" ? (
              <DropdownItem href="/driverdashboar">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : (
              <DropdownItem></DropdownItem>
            )}
            <DropdownItem
              onClick={handleLogout}
              key="logout"
              color="danger"
              className="text-danger "
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className=" inline md:hidden ">
        <Dropdown>
          <NavbarItem>
            <Badge
              content=""
              color="success"
              shape="circle"
              placement="top-right"
            >
              <DropdownTrigger>
                <div className=" flex px-3">
                  <div>
                    <Avatar
                      isBordered
                      color="default"
                      name={userDetails?.name}
                      size="md"
                      src={
                        userDetails?.image ? userDetails?.image : "/avatar.png"
                      }
                    />
                  </div>
                </div>
              </DropdownTrigger>
            </Badge>
          </NavbarItem>
          <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => ({ actionKey })}
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-black dark:text-white">
                Signed in as
              </p>
              <p className="font-semibold text-black dark:text-white">
                {userDetails?.email}
              </p>
            </DropdownItem>
            {pathname !== "/userdashboard" &&
            session?.user?.role === "Customer" ? (
              <DropdownItem href="/userdashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname !== "/admindashboard" &&
              session?.user?.role === "Admin" ? (
              <DropdownItem href="/admindashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname !== "/driverdashboard" &&
              session?.user?.role === "Driver" ? (
              <DropdownItem href="/driverdashboar">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : (
              <DropdownItem></DropdownItem>
            )}
            <DropdownItem
              onClick={handleLogout}
              key="logout"
              color="danger"
              className="text-danger "
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
