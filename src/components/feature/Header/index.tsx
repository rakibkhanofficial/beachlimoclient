import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./icons";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { DarkModeSwitch } from "../AdminDashboard/navbar/darkmodeswitch";
import { UserDropdown } from "../UserDropDown";
import Image from "next/image";

const HeaderLandingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  const handlehome = () => {
    router.push("/");
  };

  return (
    <Navbar className="bg-gray-100 text-black dark:bg-slate-800 dark:text-white">
      <NavbarBrand className="cursor-pointer" onClick={handlehome}>
        <div onClick={handlehome}>
          <Image src={"/largelogo.png"} width={120} height={30} alt="Beachlimo"/>
        </div>
      </NavbarBrand>

      {
        // @ts-expect-error type error is not solved
        session?.user?.accessToken && pathname !== "/" ? (
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <Link className="items-centers flex justify-center" href="/">
              Home
            </Link>
          </NavbarContent>
        ) : (
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarItem>
              <Link
                className="text-black dark:text-white"
                onClick={handleScroll}
                href="#home"
                color="foreground"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white"
                color="foreground"
                onClick={handleScroll}
                href="#brand"
              >
                Brands
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white"
                onClick={handleScroll}
                color="foreground"
                href="#services"
              >
                Services
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white"
                onClick={handleScroll}
                color="foreground"
                href="#whychoose"
              >
                Why Choose
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="text-black dark:text-white"
                onClick={handleScroll}
                color="foreground"
                href="#download"
              >
                Download
              </Link>
            </NavbarItem>
          </NavbarContent>
        )
      }
      <NavbarContent justify="end">
        <DarkModeSwitch />
      </NavbarContent>
      {
        // @ts-expect-error type error is not solved
        session?.user?.accessToken ? (
          <NavbarContent justify="end">
            <UserDropdown />
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            {pathname !== "/login" && (
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
            )}
            {pathname !== "/register" && (
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  href="/register"
                  variant="flat"
                >
                  Register
                </Button>
              </NavbarItem>
            )}
          </NavbarContent>
        )
      }
    </Navbar>
  );
};

export default HeaderLandingPage;
