/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "./PrivateRouts.data";
import { Spinner } from "@nextui-org/react";

type Props = {
  children?: any;
};
interface Route {
  id: string;
  path: string;
  linkName: string;
  // ... other properties
}

const PrivateRouting = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession(); // Destructure the status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIsMatched = async () => {
      if (status === "loading") {
        // If session is still loading, keep the spinner displayed
        return;
      }

      setLoading(false); // Set loading to false when session status is determined

      if (status === "authenticated") {
        // @ts-expect-error type error is not solved
        const filteredRoutes = filterRoutes(session?.user?.role || "---");
        const isMatched = isPathMatched(pathname, filteredRoutes);

        if (!isMatched) {
          router.push("/login");
        }
      } else {
        // Handle the case when the user is not authenticated
        router.push("/login");
      }
    };

    checkIsMatched();
  }, [status, session, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Spinner
          size="lg"
          label="Loading...."
          color="primary"
          labelColor="primary"
        />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default PrivateRouting;

export const filterRoutes = (filterKey: string) => {
  const filteredRoutes = routes[`${filterKey.toLowerCase()}`];
  return filteredRoutes || [];
};

// function isPathMatched(pathname: any, routes: any[]): boolean {
//   const allRoutes: Route[] = routes.reduce(
//     (acc, section) => [...acc, ...section.routes],
//     [],
//   );
// Check if the provided pathname matches any route path
//   return allRoutes.some((route) => route.path === pathname);
// }

function isPathMatched(pathname: string, routes: any[]): boolean {
  const allRoutes: any[] = routes.reduce(
    (acc, section) => [...acc, ...section.routes],
    [],
  );

  // Check if the provided pathname matches any route path or subRoute href
  return (
    allRoutes.some((route) => route.path === pathname) ||
    allRoutes.some((route) =>
      route.subRoutes.some((subRoute: any) => subRoute.href === pathname),
    )
  );
}
