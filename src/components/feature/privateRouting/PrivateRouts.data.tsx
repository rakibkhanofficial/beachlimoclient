/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDashboardCustomize } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { FcSupport } from "react-icons/fc";
import { GiAutoRepair } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { FaSitemap } from "react-icons/fa6";
import { LiaSitemapSolid } from "react-icons/lia";
import { FcAcceptDatabase } from "react-icons/fc";

export const routes: any = {

  admin: [
    {
      label: "Main menu",
      routes: [
        {
          id: "1",
          path: "/admindashboard",
          linkName: "Dashboard",
          icon: <MdDashboardCustomize fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "2",
          path: "/generateqr",
          linkName: "Generate Products",
          icon: <LiaSitemapSolid fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "3",
          path: "/productlist",
          linkName: "Generated Product List",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "4",
          path: "/registeredproductlist",
          linkName: "Registered Product List",
          icon: <FcAcceptDatabase fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "5",
          path: "/adminwarrantyclaimlist",
          linkName: "Warranty Claim History",
          icon: <FcSupport fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "6",
          path: "/createmiddler",
          linkName: "MiddleMan Create",
          icon: <GiAutoRepair fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "7",
          path: "/middlemanlist",
          linkName: "MiddleMan List",
          icon: <GrServices fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
      ],
    },
  ],

  customer: [
    {
      label: "Main menu",
      routes: [
        {
          id: "1",
          path: "/userdashboard",
          linkName: "Dashboard",
          icon: <MdDashboardCustomize fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "2",
          path: "/bookinglist",
          linkName: "All Booking List",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "3",
          path: "/pendingbookinglist",
          linkName: "Pending Booking",
          icon: <FaSitemap fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "4",
          path: "/completebokkinglist",
          linkName: "Complete Booking",
          icon: <FaSitemap fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "5",
          path: "/cancelbokkinglist",
          linkName: "Cancel Booking",
          icon: <FaSitemap fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
      ],
    },
  ],

  driver: [
    {
      label: "Main Menu",
      routes: [
        {
          id: "1",
          path: "/servicemandashboard",
          linkName: "Dashboard",
          icon: <MdDashboardCustomize fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "2",
          path: "/warranty-claim/request-list",
          linkName: "Warranty Claim",
          icon: <GiAutoRepair fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
      ],
    },
  ],

};

export const getRoutesByRole = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return routes.admin;
    case "customer":
      return routes.customer;
    case "driver":
      return routes.driver;
    default:
      return [];
  }
};
