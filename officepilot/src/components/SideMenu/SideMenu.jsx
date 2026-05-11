import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineSpeed,
  MdDashboard,
  MdGroups,
  MdEventNote,
  MdNotificationsActive,
  MdAssessment,
  MdHome,
  MdCode,
  MdMenu,
  MdClose,
  MdAssignment,
} from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import logo from "./../../assets/logo.png";
import useRole from "../../Hooks/useRole";
import { CollapsibleMenu } from "./CollapsibleMenu";

const SideMenu = () => {
  const [role, isRoleLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state

  const toggleMenu = () => setIsOpen(!isOpen);

  if (isRoleLoading) {
    return (
      <div className="w-64 bg-[#2b3854] p-4 text-gray-500">Loading...</div>
    );
  }

  return (
    <>
      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      <div className="lg:hidden flex items-center justify-between bg-[#2b3854] p-4 sticky top-0 z-50 shadow-md lg:fixed">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8 object-contain" alt="Logo" />
          <span className="text-white font-bold text-lg tracking-tight">
            MJ SOFT{" "}
            <span className="text-[#FE7F2D] italic font-light">Pilot</span>
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="text-white text-3xl p-1 rounded-lg bg-white/5 active:bg-white/10"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* --- OVERLAY (Click to close menu on mobile) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#2b3854] backdrop-blur-sm z-[60] lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <div
        className={`
        fixed lg:static top-0 left-0 h-screen w-80 lg:w-72 bg-[#2b3854] 
        border-r border-dashed border-gray-700/50 p-4 transition-all duration-300 z-[70]
        overflow-y-auto transform
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Brand Section (Hidden on Mobile Header, shown inside sidebar) */}
        <div className="hidden lg:flex flex-col items-center mb-10 px-2">
          <div className="bg-white/5 p-2 rounded-2xl mb-3 shadow-inner">
            <img src={logo} className="w-12 h-12 object-contain" alt="Logo" />
          </div>
          <p className="text-xl font-bold text-white tracking-tight">
            MJ SOFT{" "}
            <span className="text-[#FE7F2D] font-light italic">Pilot</span>
          </p>
        </div>

        {/* Mobile Sidebar Close Button (Optional) */}
        <div className="lg:hidden flex justify-end mb-6">
          <button onClick={toggleMenu} className="text-gray-400 p-2">
            <MdClose size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-y-1">
          {/* ================= ADMIN MENU ================= */}
          {role === "admin" && (
            <>
              <SectionTitle title="System Control" />
              <MenuLink
                onClick={toggleMenu}
                to="/admin/dashboard"
                icon={MdDashboard}
                label="Admin Console"
              />
              <CollapsibleMenu icon={MdGroups} label="User Management">
                <SubMenuLink to="/admin/all-users" label="All Users" />
                <SubMenuLink to="/admin/role-permissions" label="Roles & Permissions" />
                <SubMenuLink to="/admin/add-user" label="Add New User" />
                <SubMenuLink to="/admin/user-logs" label="Activity Logs" />
              </CollapsibleMenu>

              <SectionTitle title="Operations & Projects" />

              <CollapsibleMenu icon={MdAssignment} label="Project">
                <SubMenuLink to="/admin/all-projects" label="All Project" />
                <SubMenuLink
                  to="/admin/project-timeline"
                  label="Project Timeline"
                />
                <SubMenuLink to="/admin/add-new-project" label="Add New Project" />
                <SubMenuLink
                  to="/admin/complete-project"
                  label="Completed Project"
                />
                <SubMenuLink
                  to="/admin/recent-activity"
                  label="Activity Logs"
                />
              </CollapsibleMenu>

              <SectionTitle title="Organization" />
              <CollapsibleMenu icon={MdGroups} label="Employee Management">
                <SubMenuLink
                  to="/admin/employees/all-employees"
                  label="Employee Directory"
                />
                <SubMenuLink to="/admin/employees/add" label="Add New Member" />
                <SubMenuLink
                  to="/admin/employees/attendance"
                  label="Attendance Logs"
                />
                <SubMenuLink
                  to="/admin/employees/leave"
                  label="Leave & Holidays"
                />
                <SubMenuLink
                  to="/admin/employees/performance"
                  label="KPI & Feedback"
                />
                <SubMenuLink
                  to="/admin/employees/designations"
                  label="Designations"
                />
              </CollapsibleMenu>

              <CollapsibleMenu icon={MdAssessment} label="Financial Reports">
                <SubMenuLink
                  to="/admin/finance/revenue"
                  label="Revenue Overview"
                />
                <SubMenuLink
                  to="/admin/finance/expenses"
                  label="Expense Tracker"
                />
                <SubMenuLink
                  to="/admin/finance/profit-loss"
                  label="Profit & Loss"
                />
                <SubMenuLink
                  to="/admin/finance/invoice"
                  label="Payment History"
                />
                <SubMenuLink
                  to="/admin/finance/payroll"
                  label="Salary & Payroll"
                />
              </CollapsibleMenu>

              <MenuLink
                onClick={toggleMenu}
                to="/leave-application"
                icon={MdNotificationsActive}
                label="Leave Requests"
              />
            </>
          )}

          {/* ================= MEMBER MENU ================= */}
          {role === "member" && (
            <>
              <SectionTitle title="My Workspace" />
              <MenuLink
                onClick={toggleMenu}
                to="/member/dashboard"
                icon={MdDashboard}
                label="My Dashboard"
              />
              <MenuLink
                onClick={toggleMenu}
                to="/my-project"
                icon={MdGroups}
                label="My Projects"
              />
              <MenuLink
                onClick={toggleMenu}
                to="/daily-task"
                icon={MdEventNote}
                label="Task List"
              />
              <MenuLink
                onClick={toggleMenu}
                to="/apply-leave"
                icon={MdNotificationsActive}
                label="Apply Leave"
              />
            </>
          )}

          {/* ================= SHARED / COMMON ================= */}
          <SectionTitle title="General" />
          <MenuLink
            onClick={toggleMenu}
            to="/noticeboard"
            icon={MdNotificationsActive}
            label="Notice Board"
          />
          <MenuLink
            onClick={toggleMenu}
            to="/home-main"
            icon={MdHome}
            label="Back to Web"
          />
          <MenuLink
            onClick={toggleMenu}
            to="/home-main"
            icon={MdHome}
            label="Site Settings"
          />
        </div>

        {/* Copyright Section */}
        <div className="mt-auto pt-10 pb-4">
          <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
            <p className="text-[10px] text-gray-500 text-center italic uppercase tracking-wider">
              © 2026 Office Pilot
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

// --- Sub-components with Props Handling ---

const SectionTitle = ({ title }) => (
  <p className="text-[10px] font-black uppercase tracking-[2px] mt-6 mb-3 px-4 text-gray-500">
    {title}
  </p>
);

const MenuLink = ({ to, icon: Icon, label, hasArrow, onClick }) => {
  const activeClass =
    "flex items-center justify-between gap-x-3 text-white bg-gradient-to-r from-[#FE7F2D] to-[#f4a261] rounded-xl p-3 w-full shadow-lg shadow-orange-500/20 transition-all duration-300 border-l-4 border-white";
  const inactiveClass =
    "flex items-center justify-between gap-x-3 text-[#919EAB] hover:text-white hover:bg-white/10 rounded-xl p-3 w-full transition-all duration-200 group";

  return (
    <li className="list-none">
      <NavLink
        to={to}
        onClick={onClick} // Closes menu on mobile after clicking
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        <div className="flex items-center gap-x-3">
          <Icon className="text-xl group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-[14px]">{label}</span>
        </div>
        {hasArrow && <FaAngleRight className="text-xs opacity-50" />}
      </NavLink>
    </li>
  );
};

const SubMenuLink = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      block py-2 px-4 text-[13px] transition-all rounded-lg
      ${
        isActive
          ? "text-[#FE7F2D] font-bold bg-orange-500/5"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }
    `}
  >
    {label}
  </NavLink>
);
