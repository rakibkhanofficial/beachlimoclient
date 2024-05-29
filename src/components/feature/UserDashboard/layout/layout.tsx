import React, { useState } from "react";
import { SidebarContext } from "./layout-context";
import { useLockedBody } from "../hooks/useBodyLock";
import SidebarWrapper from "../sidebar/sidebar";
import { NavbarWrapper } from "../navbar/navbar";
import Footer from "../../Footer";

interface Props {
  children: React.ReactNode;
}

export const UserDashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };
  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>
          {children}
          <footer className="w-full">
              <Footer />
          </footer>
        </NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
