import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../Pages/Error/Errorpage";
import AdminHome from "../Pages/Home/AdminHome";
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
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Register/Signup";

import NewAdminDashboard from "./../Pages/Home/NewAdminDashboard";

// const router = createBrowserRouter([
//   // common route member
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <ErrorPage />,

//     children: [
//       // guest user dashboard
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: '/admin-home',
//         element: <NewAdminDashboard/>,
//       },

//       // All projects
//       {
//         path: "/projects",
//         element: (
//           <ProtectedRoute>
//             <ProjectList />{" "}
//           </ProtectedRoute>
//         ),
//       },

//       // add project
//       {
//         path: "/add-project",
//         element: (
//           <ProtectedRoute>
//             <AddProject />
//           </ProtectedRoute>
//         ),
//       },

//       // Project Details
//       {
//         path: "/project-details/:id",
//         element: (
//           <ProtectedRoute>
//             <ProjectDetails />
//           </ProtectedRoute>
//         ),
//       },

//       // project update
//       {
//         path: "/update/:id",
//         element: (
//           <ProtectedRoute>
//             <ProjectUpdate />
//           </ProtectedRoute>
//         ),
//       },

//       {
//         path: "/all-employee/:id",
//         element: (
//           <ProtectedRoute>
//             <Employees />
//           </ProtectedRoute>
//         ),
//       },

//       {
//         path: "/all-employees",
//         element: <Employees />,
//       },

//       {
//         path: "/attendance",
//         element: (
//           <ProtectedRoute>
//             <Attendance />
//           </ProtectedRoute>
//         ),
//       },

//       {
//         path: "/leave-application",
//         element: (
//           <ProtectedRoute>
//             <LeaveApplication />
//           </ProtectedRoute>
//         ),
//       },

//       {
//         path: "/noticeboard",
//         element: <NoticeBoard />,
//       },

//       {
//         path: "/member-project-details/:id",
//         // element: <MemberProjectDetails />,
//         // loader: async () => {
//         //   const res = await fetch("/project.json"); // Absolute path from public folder
//         //   return res.json();
//         // },
//       },

//       {
//         path: "/my-project",
//         // element: <MyProjects />,
//       },

//       {
//         path: "/daily-task",
//         // element: <DailyTask />,
//       },

//       {
//         path: "/performance",
//         element: <TargetAndPerformance />,
//       },

//       {
//         path: "/member-performance",
//         // element: <MyWork />,
//       },

//       {
//         path: "/orderstatus",
//         // element: <OrderStatusTable />,
//       },

//       {
//         path: "/team",
//         // element: <Team />,
//       },

//       {
//         path: "/contact",
//         // element: <Contact />,
//       },

//       {
//         path: "/login",
//         element: <Login />,
//       },

//       {
//         path: "/signup",
//         element: <SignUp />,
//       },
//     ],
//   },

//   // ================================================================================
//   // ================================= ADMIN ROUTE ==================================
//   {
//     path: "/admin",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "dashboard",
//         element: (
//           <ProtectedRoute>
//             <NewAdminDashboard />
//           </ProtectedRoute>
//         ),
//       },

//       // ================================================================================
//       // =============================== ADMIN && LEADER ================================

//       // All projects
//       {
//         path: "/projects",
//         element: (
//           <ProtectedRoute>
//             <ProjectList />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // ===========================================================================
      // ============================ GUEST USER ROUTE =============================
      {
        path: "admin/all-projects",
        element: (
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-employees",
        element: <Employees />,
      },
      {
        path: "noticeboard",
        element: <NoticeBoard />,
      },
      {
        path: "performance",
        element: <TargetAndPerformance />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },

  // ======================================================================
  // ============================ ADMIN ROUTE =============================
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <NewAdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/all-employees",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ======================================================================
  // ============================ LEADER ROUTE =============================

  {
    path: "/leader",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <NewAdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ======================================================================
  // ============================ TEAM LEADER ROUTE =============================

  {
    path: "/team-leader",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <NewAdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ======================================================================
  // ============================ MEMBER ROUTE =============================

  {
    path: "/member",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <NewAdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
