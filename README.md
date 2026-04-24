# ✈️ Office Pilot | Smart Project Management Solution

**Office Pilot** is a comprehensive Full-Stack application designed to act as the cockpit for your organization's workflow. It helps teams navigate through projects, assign tasks based on departments, and maintain strict data privacy through a multi-tier authorization system.



## 🚀 Top Features

- **Multi-Level Dashboard:** Tailored experiences for Admins, Leaders, Team Leaders, and Members.
- **Smart Data Filtering:** Members see only assigned tasks, Leaders see department projects, and Admins oversee everything.
- **Secure Authentication:** Integrated with Firebase for reliable user sign-in/up.
- **JWT Protection:** Backend routes are fortified with custom JWT verification and Role-based middleware.
- **Project Lifecycle:** Seamless project creation, assignment, and status updates via a clean UI.

## 🛠️ Technical Architecture

- **Frontend:** React.js, Tailwind CSS, Axios (with custom secure interceptors).
- **Backend:** Node.js, Express.js, MongoDB (Aggregation and query filtering).
- **Security:** Firebase Auth, JWT (JSON Web Token), RBAC Middleware.

## 📁 Folder Structure

```text
Office-Pilot/
├── client/          # React frontend (Vite)
├── server/          # Node/Express backend
└── README.md        # Project documentation

```

## 🛡️ Role-Based Access (RBAC) Logic
In Office Pilot, your role defines your power:

- **Admin:** The "Super Pilot" – can manage all projects and users.
- **Leader:** Managed department-specific projects and resources.
- **Team Leader:** Oversees specific team progress and assignments.
- **Member:** Executes tasks and views personal project pipelines.

## 🤝 Contact
Developed by: Md Jasim Uddin
Feel free to reach out for collaboration or feedback!
