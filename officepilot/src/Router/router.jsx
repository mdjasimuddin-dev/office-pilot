import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../Pages/Error/Errorpage";
import Home from "../Pages/Home/Home";

import ProjectList from "./../Pages/Project/ProjectList";
import ProjectDetails from "./../Pages/Dashboard/Project/ProjectDetails/ProjectDetails";
import UpdateUpdate from "./../Pages/Dashboard/Project/UpdateProject/UpdateProject";
import ProjectUpdate from "./../Pages/Dashboard/Project/Project Update/ProjectUpdate";

import AddProject from "./../Pages/Dashboard/Project/AddProject/AddProject";
import Employees from "./../Pages/Employee/All Employee/Employee";
import Attendance from "../Pages/Employee/Attendance/Atendance";
import LeaveApplication from "../Pages/Employee/Leave Application/LeaveApplication";
import NoticeBoard from "../Pages/Notice Board/NoticeBoard";

import TargetAndPerformance from "../Pages/Dashboard/TargetPerformance/TargetAndPerformance";
import ProtectedRoute from "../Router/ProtectedRoute";
import Login from "../Pages/Login/Login"
import SignUp from "../Pages/Register/Signup"

const router = createBrowserRouter([
  // common route member
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <ProtectedRoute> <Home /> </ProtectedRoute>,
      },

      // All projects
      {
        path: "/projects",
        element: (
          <ProtectedRoute>
            <ProjectList />{" "}
          </ProtectedRoute>
        ),
      },

      // add project
      {
        path: "/add-project",
        element: <AddProject />,
      },

      // Project Details
      {
        path: "/project-details/:id",
        element: <ProjectDetails />,
      },

      // project update
      {
        path: "/update/:id",
        element: <ProjectUpdate />,
      },

      {
        path: "/all-employee/:id",
        element: <Employees />,
      },

      {
        path: "/all-employees",
        element: <Employees />,
      },

      {
        path: "/attendance",
        element: <Attendance />,
      },

      {
        path: "/leave-application",
        element: <LeaveApplication />,
      },

      {
        path: "/noticeboard",
        element: <NoticeBoard />,
      },

      {
        path: "/member-project-details/:id",
        // element: <MemberProjectDetails />,
        // loader: async () => {
        //   const res = await fetch("/project.json"); // Absolute path from public folder
        //   return res.json();
        // },
      },

      {
        path: "/my-project",
        // element: <MyProjects />,
      },

      {
        path: "/daily-task",
        // element: <DailyTask />,
      },

      {
        path: "/performance",
        element: <TargetAndPerformance />,
      },

      {
        path: "/member-performance",
        // element: <MyWork />,
      },

      {
        path: "/orderstatus",
        // element: <OrderStatusTable />,
      },

      {
        path: "/team",
        // element: <Team />,
      },

      {
        path: "/contact",
        // element: <Contact />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
