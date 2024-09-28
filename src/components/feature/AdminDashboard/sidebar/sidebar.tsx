import React from "react";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSidebarContext } from "../layout/layout-context";
import { GiAutoRepair } from "react-icons/gi";
import { getRoutesByRole } from "../../privateRouting/PrivateRouts.data";
import Link from "next/link";
import { ScrollShadow } from "@nextui-org/react";
import { useCustomSession } from "~@/hooks/customSessionhook";

const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { session } = useCustomSession();

  const filteredRoutes = getRoutesByRole(session?.user?.role ?? "---");

  return (
    <aside className="sticky top-0 z-50 h-screen text-sm">
      {collapsed ? (
        <div
          className="fixed inset-0 z-50 bg-[rgb(15_23_42/0.3)] opacity-80 transition-opacity md:z-auto md:hidden md:opacity-100"
          onClick={setCollapsed}
        />
      ) : null}
      <div
        className={`fixed h-full  transition-transform ${
          collapsed ? "ml-0 translate-x-0 overflow-y-auto" : "-translate-x-full"
        } z-[202] w-64 shrink-0 flex-col border-divider  bg-white px-3  py-6 border-r-1 dark:bg-gray-950 md:static md:ml-0 md:flex md:h-screen md:translate-x-0`}
      >
        <div className="flex items-center justify-center">
          <Image
            src="/largelogo.png"
            priority={true}
            height={150}
            className="h-auto w-auto"
            width={150}
            alt="Qr Code Logo"
          />
        </div>
        <Link href="/" className=" text-center cursor-pointer text-xl text-black dark:text-white font-bold ">Beach Limo</Link>
        <ScrollShadow className="flex h-full custom-scrollbar flex-col justify-between">
            {filteredRoutes &&
              filteredRoutes?.length > 0 &&
              filteredRoutes.map((item: any, index: number) => (
                <div key={index}>
                  <SidebarMenu title={item.label}>
                    {item.routes.map((subItem: any, index: number) => (
                      <div key={index}>
                        {subItem?.subRoutes?.length > 0 ? (
                          <CollapseItems
                            icon={<GiAutoRepair fontSize="1rem" />}
                            items={subItem?.subRoutes}
                            title="Service Man"
                            isActive={pathname.startsWith("/employee")}
                          />
                        ) : (
                          <SidebarItem
                            key={index}
                            title={subItem.linkName}
                            icon={subItem.icon}
                            isActive={pathname === subItem.path}
                            href={subItem.path}
                          />
                        )}
                      </div>
                    ))}
                  </SidebarMenu>
                </div>
              ))}
        </ScrollShadow>
      </div>
    </aside>
  );
};

export default SidebarWrapper;
