import { MdDashboardCustomize } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { FcSupport } from "react-icons/fc";
import { GiAutoRepair } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { FaSitemap } from "react-icons/fa6";
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
          path: "/adminallrentdata",
          linkName: "All Booking List",
          icon: <MdDashboardCustomize fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "3",
          path: "/adminpendingbookinglist",
          linkName: "Pending Booking List",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "4",
          path: "/acceptedbookinglistbyadmin",
          linkName: "Accepted Booking List",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "5",
          path: "/assignbookinglistbyadmin",
          linkName: "Assigned Booking List",
          icon: <FcAcceptDatabase fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "6",
          path: "/admincompletebookinglist",
          linkName: "Complete Booking List",
          icon: <FcSupport fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "7",
          path: "/admincancelbookinglist",
          linkName: "Cancel Booking List",
          icon: <FcSupport fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "8",
          path: "/createdriver",
          linkName: "Driver Create",
          icon: <GiAutoRepair fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "9",
          path: "/driverlist",
          linkName: "Driver List",
          icon: <GrServices fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "10",
          path: "/customerlist",
          linkName: "Customer List",
          icon: <GrServices fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "11",
          path: "/categorymanagement",
          linkName: "Category Management",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "12",
          path: "/subcategorymanagement",
          linkName: "Sub-Category Management",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "13",
          path: "/createdcar",
          linkName: "Add Car",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "14",
          path: "/enlistedcarList",
          linkName: "Enlisted Car",
          icon: <CiBoxList fontSize="1rem" />,
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
          path: "/userallbookinglist",
          linkName: "Booking List",
          icon: <CiBoxList fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        // {
        //   id: "3",
        //   path: "/userpendingbookinglist",
        //   linkName: "Pending Booking",
        //   icon: <FaSitemap fontSize="1rem" />,
        //   component: <></>,
        //   subRoutes: [],
        // },
        // {
        //   id: "4",
        //   path: "/useracceptedbookinglist",
        //   linkName: "Accepted Booking",
        //   icon: <FaSitemap fontSize="1rem" />,
        //   component: <></>,
        //   subRoutes: [],
        // },
        // {
        //   id: "5",
        //   path: "/userassignbookinglist",
        //   linkName: "Assign Booking",
        //   icon: <FaSitemap fontSize="1rem" />,
        //   component: <></>,
        //   subRoutes: [],
        // },
        // {
        //   id: "6",
        //   path: "/usercompletebooking",
        //   linkName: "Complete Booking",
        //   icon: <FaSitemap fontSize="1rem" />,
        //   component: <></>,
        //   subRoutes: [],
        // },
        // {
        //   id: "7",
        //   path: "/usercancelbookinglist",
        //   linkName: "Cancel Booking",
        //   icon: <FaSitemap fontSize="1rem" />,
        //   component: <></>,
        //   subRoutes: [],
        // },
      ],
    },
  ],

  driver: [
    {
      label: "Main Menu",
      routes: [
        {
          id: "1",
          path: "/driverdashboard",
          linkName: "Dashboard",
          icon: <MdDashboardCustomize fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "2",
          path: "/driverassignbookinglist",
          linkName: " Assign Booking List",
          icon: <GiAutoRepair fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "3",
          path: "/drivercompletebookinglist",
          linkName: " Complete Booking List",
          icon: <GiAutoRepair fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        },
        {
          id: "3",
          path: "/drivercancelbookinglist",
          linkName: " Cancel Booking List",
          icon: <GiAutoRepair fontSize="1rem" />,
          component: <></>,
          subRoutes: [],
        }
      ],
    },
  ],

};

export const getRoutesByRole = (role: string) => {
  switch (role) {
    case "Admin":
      return routes.admin;
    case "Customer":
      return routes.customer;
    case "Driver":
      return routes.driver;
    default:
      return [];
  }
};
