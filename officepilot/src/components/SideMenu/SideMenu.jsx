import { NavLink } from "react-router-dom";
import { MdOutlineSpeed, MdDashboard, MdGroups, MdEventNote, MdPermMedia, MdNotificationsActive, MdAssessment, MdHome, MdCode } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import logo from "./../../assets/logo.png";

const SideMenu = () => {
  const role = "admin"; // Dynamic role trigger

  // Premium Styles
  const activeClass = "flex items-center justify-between gap-x-3 text-white bg-gradient-to-r from-[#FE7F2D] to-[#f4a261] rounded-xl p-3 w-full shadow-lg shadow-orange-500/20 transition-all duration-300 border-l-4 border-white";
  const inactiveClass = "flex items-center justify-between gap-x-3 text-[#919EAB] hover:text-white hover:bg-white/10 rounded-xl p-3 w-full transition-all duration-200 group";

  const MenuLink = ({ to, icon: Icon, label, hasArrow }) => (
    <li className="list-none">
      <NavLink to={to} className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        <div className="flex items-center gap-x-3">
          <Icon className="text-xl group-hover:scale-110 transition-transform" />
          <span className="font-medium text-[15px]">{label}</span>
        </div>
        {hasArrow && <FaAngleRight className="text-xs opacity-50" />}
      </NavLink>
    </li>
  );

  const SectionTitle = ({ title }) => (
    <p className="text-[11px] font-bold uppercase tracking-[2px] mt-8 mb-4 px-4 text-[#637381]">
      {title}
    </p>
  );

  return (
    <div className="w-64 min-h-screen bg-[#1c252e] border-r border-dashed border-gray-700/50 p-4 transition-all overflow-y-auto">
      {/* Brand Section */}
      <div className="flex flex-col items-center mb-10 px-2">
        <div className="bg-white/5 p-2 rounded-2xl mb-3 shadow-inner">
            <img src={logo} className="w-12 h-12 object-contain" alt="Logo" />
        </div>
        <p className="text-xl font-bold text-white tracking-tight">
          MJ SOFT <span className="text-[#FE7F2D] font-light italic">Pilot</span>
        </p>
      </div>

      <div className="flex flex-col gap-y-1">
        {/* ================= ADMIN MENU ================= */}
        {role === "admin" && (
          <>
            <SectionTitle title="Overview" />
            <MenuLink to="/" icon={MdDashboard} label="Admin Dashboard" />
            <MenuLink to="/projects" icon={MdGroups} label="All Projects" />
            
            <SectionTitle title="Employee Management" />
            <MenuLink to="/all-employees" icon={MdGroups} label="Team List" hasArrow />
            <MenuLink to="/attendance" icon={MdEventNote} label="Daily Attendance" />
            <MenuLink to="/leave-application" icon={MdNotificationsActive} label="Leave Requests" />

            <SectionTitle title="Communication" />
            <MenuLink to="/noticeboard" icon={MdNotificationsActive} label="Notice Board" hasArrow />
            <MenuLink to="/performance" icon={MdAssessment} label="Performances" hasArrow />
            <MenuLink to="/media" icon={MdPermMedia} label="Media Gallery" />
            
            <SectionTitle title="System" />
            <MenuLink to="/home-main" icon={MdHome} label="Back to Web" />
            <MenuLink to="/developer" icon={MdCode} label="Developer Info" />
          </>
        )}

        {/* ================= LEADER / MEMBER (Similarly mapped) ================= */}
        {(role === "leader" || role === "member") && (
          <>
            <SectionTitle title="Workspace" />
            <MenuLink to="/home" icon={MdDashboard} label="Dashboard" />
            <MenuLink to="/my-project" icon={MdGroups} label="My Projects" />
            <MenuLink to="/daily-task" icon={MdEventNote} label="Daily Tasks" />
            <MenuLink to="/performance" icon={MdAssessment} label="My Progress" hasArrow />
          </>
        )}
      </div>

      {/* Logout or Bottom Support Section (Optional) */}
      <div className="mt-10 p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
        <p className="text-[10px] text-gray-500 text-center italic">© 2026 MJ SOFT Office Pilot</p>
      </div>
    </div>
  );
};

export default SideMenu;