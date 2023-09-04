import React, { lazy } from "react";
import Loadable from "../Components/Master/Loadable";
import NotFound from "../BLL/Commen/NotFound";
import ChangePasswordBLL from "../BLL/User/ChangePassword";

const PaymentBatch = Loadable(lazy(() => import("../BLL/Payment/PaymentBatch")));
const RegisterationList = Loadable(lazy(() => import("../BLL/User/Form/Registration/RegisterationList")));
const PaymentList = Loadable(lazy(() => import("../BLL/Payment/PaymentList")));
const StudentList = Loadable(lazy(() => import("../BLL/Student/StudentList")));
const ParentDashboard = Loadable(lazy(() => import("../BLL/Student/ParentDashboard")));
const Dashboard = Loadable(lazy(() => import("../BLL/User/Dashboard")));
const UserList = Loadable(lazy(() => import("../BLL/User/UserList")));
const PathshalaSchedule = Loadable(lazy(() => import("../BLL/Commen/PathshalaSchedule")));
const Roles = Loadable(lazy(() => import("../BLL/Commen/Roles")));
const Profile = Loadable(lazy(() => import("../BLL/User/Profile")));
const PaymentHistory = Loadable(lazy(() => import("../Components/Payment/PaymentHistory")));
const StudentProgress = Loadable(lazy(() => import("../BLL/Student/StudentProgress")));
const StudentRegistrationC = Loadable(lazy(() => import("../BLL/Student/StudentRegister copy")));

const DashboardRoutes = [
  { path: "/ParentDashboard", element: <ParentDashboard /> },
  { path: "/schedule", element: <PathshalaSchedule /> },
  { path: "/profile", element: <Profile /> },
  { path: '/StudentRegisteration', element: <StudentRegistrationC />, },
  { path: "/paymenthistory", element: <PaymentHistory /> },
  { path: "/studentProgress", element: <StudentProgress /> },
  { path: '/changepassword', element: <ChangePasswordBLL />, }
];

const AdminRoutes = [
  { path: "/roles", element: <Roles /> },
  { path: "/PaymentBatch", element: <PaymentBatch /> },
  { path: "/RegisterationList", element: <RegisterationList /> },
  { path: "/PaymentList", element: <PaymentList /> },
  { path: "/StudentList", element: <StudentList /> },
  { path: "/userList", element: <UserList /> },
  { path: "/studentProgress", element: <StudentProgress /> },
  { path: "/AdminDashboard", element: <Dashboard /> },
  { path: '/StudentRegisteration', element: <StudentRegistrationC />, },
  { path: "/schedule", element: <PathshalaSchedule /> },
  { path: "/profile", element: <Profile /> },
  { path: '/changepassword', element: <ChangePasswordBLL />, },
];

const UnMatchedRoutes = [
  { path: "*", element: <NotFound /> },
];

export { AdminRoutes, DashboardRoutes, UnMatchedRoutes };
