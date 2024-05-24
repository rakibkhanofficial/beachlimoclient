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
    <div>
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
                        session?.user?.image ||
                        "https://i.ibb.co/dtt67mC/avathar.png"
                      }
                    />
                  </div>
                  <div className=" px-6 text-sm ">
                    <p>{session?.user?.username}</p>
                    {session?.user?.isAdmin === "true" ? (
                      <p className=" font-base text-lg ">Admin</p>
                    ) : (
                      <p className=" text-base font-medium ">User</p>
                    )}
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
              className="flex w-full flex-col items-start justify-start"
            >
              <p className=" text-black dark:text-white ">Signed in as</p>
              <p className=" text-black dark:text-white ">{session?.user?.email}</p>
            </DropdownItem>
            {pathname !== "/userdashboard" &&
            pathname !== "/admindashboard" &&
            session?.user?.isAdmin === "false" ? (
              <DropdownItem href="/userdashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
            ) : (
              <DropdownItem href="/admindashboard" key="dashboard">
                <p className=" text-black dark:text-white "> Go to Dashbaord</p>
              </DropdownItem>
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
              placement="bottom-right"
            >
              <DropdownTrigger>
                <Avatar
                  isBordered
                  color="default"
                  src={
                    session?.user?.image ||
                    "https://i.ibb.co/dtt67mC/avathar.png"
                  }
                />
              </DropdownTrigger>
            </Badge>
          </NavbarItem>
          <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => ({ actionKey })}
          >
            <DropdownItem
              key="profile"
              className="flex w-full flex-col items-start justify-start"
            >
              <p>Signed in as</p>
              <p>{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem href="/profile" key="settings">
              My Profile
            </DropdownItem>
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
