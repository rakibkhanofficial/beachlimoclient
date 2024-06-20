import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { useSession } from "next-auth/react";
import UseLogout from "~@/modules/auth/hocs/logout";
import { usePathname } from "next/navigation";

export const UserDropdown = () => {
  const { handleSignOut } = UseLogout();
  const { data: session } = useSession();
  const pathname = usePathname();

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
                <div className=" flex px-3">
                  <div>
                    <Avatar
                      isBordered
                      color="default"
                      src={
                        session?.user?.image ? session?.user?.image :
                        "https://i.ibb.co/dtt67mC/avathar.png"
                      }
                    />
                  </div>
                  <div className=" px-6 text-sm ">
                    <p className="text-black dark:text-white">
                      {
                        // @ts-expect-error type error is not solved
                        session?.user?.username
                      }
                    </p>
                    <p className="text-black dark:text-white">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
              </DropdownTrigger>
            </Badge>
          </NavbarItem>
          <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => ({ actionKey })}
          >
            <DropdownItem
              key="profile"
              className="flex w-full flex-col items-start justify-start text-black dark:text-white"
            >
              <p className=" text-black dark:text-white ">Signed in as</p>
              <p className=" text-black dark:text-white ">
                {session?.user?.email}
              </p>
            </DropdownItem>
            {pathname !== "/userdashboard" &&
            // @ts-expect-error type error is not solved
            session?.user?.role === "Customer" ? (
              <DropdownItem href="/userdashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname !== "/admindashboard" &&
              // @ts-expect-error type error is not solved
              session?.user?.role === "Admin" ? (
              <DropdownItem href="/admindashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname === "/driverdashboard" &&
              // @ts-expect-error type error is not solved
              session?.user?.role !== "Driver" ? (
              <DropdownItem href="/driverdashboar">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : (
              <DropdownItem></DropdownItem>
            )}
            <DropdownItem
              onClick={handleSignOut}
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
                      src={
                        session?.user?.image ||
                        "https://i.ibb.co/dtt67mC/avathar.png"
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
            <DropdownItem
              key="profile"
              className="flex w-full items-start justify-start text-black dark:text-white"
            >
              <p className=" text-black dark:text-white ">Signed in as</p>
              <p className=" text-black dark:text-white ">
                {
                  // @ts-expect-error type error is not solved
                  session?.user?.username
                }
              </p>
            </DropdownItem>
            {pathname !== "/userdashboard" &&
            // @ts-expect-error type error is not solved
            session?.user?.role === "Customer" ? (
              <DropdownItem href="/userdashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname !== "/admindashboard" &&
              // @ts-expect-error type error is not solved
              session?.user?.role === "Admin" ? (
              <DropdownItem href="/admindashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : pathname !== "/driverdashboard" &&
              // @ts-expect-error type error is not solved
              session?.user?.role === "Driver" ? (
              <DropdownItem href="/driverdashboar">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : (
              <DropdownItem></DropdownItem>
            )}
            <DropdownItem
              onClick={handleSignOut}
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
