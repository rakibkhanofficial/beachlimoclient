import Link from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <Link href={href} className="max-w-full text-default-900 active:bg-none">
      <div
        className={` hover:bg-slate-200 dark:hover:bg-slate-300 dark:hover:text-black
    ${
      isActive
        ? "bg-[#6939eb] text-white hover:bg-[#55309b] hover:text-black"
        : "hover:bg-default-100"
    }
    active:scale-[0.98]' flex h-full min-h-[44px]  w-full cursor-pointer items-center gap-1 rounded-xl px-3.5 text-default-900 transition-all duration-150
  `}
        onClick={handleClick}
      >
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};
