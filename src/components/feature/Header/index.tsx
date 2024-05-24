import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  // DropdownItem,
  // DropdownTrigger,
  // Dropdown,
  // DropdownMenu,
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
import { UserDropdown } from "../Dashboard/navbar/user-dropdown";

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

  return (
    <Navbar className="bg-gray-100 text-black">
      <NavbarBrand>
        <p className="font-bold text-inherit">Beach Limo</p>
      </NavbarBrand>
      {session?.user?.accessToken && pathname !== "/" ? (
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <Link className="items-centers flex justify-center" href="/">
            Home
          </Link>
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {/* <Dropdown>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                        endContent={icons.chevron}
                        radius="sm"
                        variant="light"
                      >
                        Features
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="ACME features"
                    className="w-[340px]"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    <DropdownItem
                      key="autoscaling"
                      description="ACME scales apps to meet user demand, automagically, based on load."
                      startContent={icons.scale}
                    >
                      Autoscaling
                    </DropdownItem>
                    <DropdownItem
                      key="usage_metrics"
                      description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                      startContent={icons.activity}
                    >
                      Usage Metrics
                    </DropdownItem>
                    <DropdownItem
                      key="production_ready"
                      description="ACME runs on ACME, join us and others serving requests at web scale."
                      startContent={icons.flash}
                    >
                      Production Ready
                    </DropdownItem>
                    <DropdownItem
                      key="99_uptime"
                      description="Applications stay on the grid with high availability and high uptime guarantees."
                      startContent={icons.server}
                    >
                      +99% Uptime
                    </DropdownItem>
                    <DropdownItem
                      key="supreme_support"
                      description="Overcome any challenge with a supporting team ready to respond."
                      startContent={icons.user}
                    >
                      +Supreme Support
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
          <NavbarItem>
            <Link
              className="text-black"
              onClick={handleScroll}
              href="#home"
              color="foreground"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-black"
              color="foreground"
              onClick={handleScroll}
              href="#brand"
            >
              Brands
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-black"
              onClick={handleScroll}
              color="foreground"
              href="#services"
            >
              Services
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-black"
              onClick={handleScroll}
              color="foreground"
              href="#whychoose"
            >
              Why Choose
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-black"
              onClick={handleScroll}
              color="foreground"
              href="#download"
            >
              Why Choose
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      {session?.user?.accessToken ? (
        <NavbarContent justify="end">
          <UserDropdown />
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            {/* signup button here  */}
            <Button as={Link} color="primary" href="/register" variant="flat">
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default HeaderLandingPage;
