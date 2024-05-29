import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { IoMdNotifications } from "react-icons/io";
import { DarkModeSwitch } from "./darkmodeswitch";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};
export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full sticky"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className=" max-w-md max-md:hidden">
          {/* <Input
            startContent={<IoIosSearch fontSize="1.5rem" />}
            size="sm"
            variant="flat"
            type="search"
            placeholder="Search..."
            className="w-full"
              classNames={{
                input: "w-full",
                mainWrapper: "w-full",
              }}
          /> */}
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit items-center  data-[justify=end]:flex-grow-0"
        >
          <DarkModeSwitch />
          <NotificationsDropdown content="3" icon={<IoMdNotifications />} />
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
