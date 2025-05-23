import Dashboard from "../Pages/dashboard";
import Users from "../Pages/Users";
import AdminProfile from "../Pages/profile";
import Booking from "../Pages/Booking";
import Banner from "../Pages/Banner";
import Cabs from "../Pages/Cabs";
import Feedback from "../Pages/feedback";
import Hotel from "../Pages/Hotel";
import { Component } from "react";

const Routes = [
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/users",
    Component: Users,
  },
  {
    path: "/booking",
    Component: Booking,
  },
  {
    path: "/banners",
    Component: Banner,
  },
  {
    path: "/cabs",
    Component: Cabs,
  },
  {
    path: "/feedbacks",
    Component: Feedback,
  },
  {
    path: "/hotels",
    Component: Hotel,
  },
  {
    path: "/profile",
    Component: AdminProfile,
  },
];

export default Routes;
