import React, { use } from "react";
import {
  Search,
  BellDot,
  Grid3X3,
  BriefcaseBusiness,
  UserCircle2,
  Settings,
  LifeBuoy,
  LogOut,
  PanelLeftClose,
  LayoutGrid,
  LogIn,
  LogsIcon,
  LogInIcon,
} from "lucide-react";
import AuthContext from "../../Context/AuthContext";
import { NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleSignOut = () => {
    logOut();
  };

  return (
    // Main Container with Frost & Subtle Pattern
    <div className="sticky top-0 z-50">
      <nav
        className="navbar bg-orange-400/90 backdrop-blur-md shadow-2xl shadow-black/10 border border-white/10"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      >
        {/* Navbar Start: Symmetry & Primary Navigation */}
        <div className="navbar-start gap-1">
          {/* Main Workspace Icon */}
          <button className="btn btn-ghost text-white hidden lg:flex gap-2">
            <LayoutGrid size={22} className="opacity-80" />
            <span className="font-semibold text-lg tracking-wide">
              Workspace
            </span>
          </button>
          {/* Sidebar Toggle for smaller screens */}
          <div className="lg:hidden dropdown dropdown-bottom">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle text-white"
            >
              <PanelLeftClose size={24} />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-xl w-56 border border-gray-200"
            >
              <li className="menu-title text-gray-400 font-bold">Quick Nav</li>
              <li>
                <a>
                  <LayoutGrid size={16} className="mr-1" /> Overview
                </a>
              </li>
              <li>
                <a>
                  <BriefcaseBusiness size={16} className="mr-1" /> Projects
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar Center: Core Branding */}
        <div className="navbar-center">
          <a className="font-bold text-3xl text-white tracking-tighter flex items-end">
            MJ SOFT{" "}
            <span className="font-light text-2xl opacity-90 ml-1 pb-px">
              Office Pilot
            </span>
          </a>
        </div>

        {/* Navbar End: Optimized User & Tools Section */}
        <div className="navbar-end gap-1.5">
          {/* Search Tools (Optimized) */}
          <button className="btn btn-ghost btn-circle text-white hover:bg-white/10 transition-all">
            <Search size={22} className="opacity-80" />
          </button>

          {/* Premium Notifications */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white hover:bg-white/10 group"
            >
              <div className="indicator">
                <BellDot
                  size={22}
                  className="opacity-80 group-hover:scale-110 transition-transform"
                />
                <span className="badge badge-xs bg-[#EE3B22] border-none indicator-item shadow-sm"></span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-4 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow-2xl rounded-2xl border border-gray-100"
            >
              <div className="card-body">
                <h3 className="font-bold text-lg text-gray-800">
                  Alerts & Status
                </h3>
                <p className="text-gray-500 text-sm">
                  No critical project alerts. Enjoy your flow.
                </p>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-sm btn-ghost text-orange-600">
                    Mark all Read
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Premium User Profile Section */}
          <div className="divider divider-horizontal border-white/10 mx-1 hidden md:block"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full cursor-pointer hover:bg-white/10 transition-all"
            >
              <div className="text-right hidden md:block">
                <span className="block font-semibold text-white">
                  {user?.displayName || "Guest User"}
                </span>
                <span className="block text-xs font-medium text-white/70">
                  {user?.role || "Regular guest"}
                </span>
              </div>
              <div className="avatar placeholder online shadow-lg">
                <div className="bg-white text-orange-600 rounded-full w-12 border-4 border-white/40">
                  {/* <span className="text-sm font-bold">JD</span> */}
                  <img className="rounded-full" src={user?.photoURL} alt="" />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-4 z-[1] p-2 shadow-2xl menu dropdown-content bg-base-100 rounded-2xl w-56 border border-gray-100 gap-1"
            >
              <li className="menu-title text-gray-400 font-bold md:hidden">
                My Account
              </li>
              <li>
                <a>
                  <UserCircle2 size={18} className="text-orange-600" /> View
                  Profile
                </a>
              </li>
              <li>
                <a>
                  <Settings size={18} /> Workspace Settings
                </a>
              </li>
              <li>
                <a>
                  <LifeBuoy size={18} /> Help & Support
                </a>
              </li>
              <div className="divider my-1 opacity-60"></div>
              {/* Sign Out  */}

              {/* Sign In When user not login  */}
              {user ? (
                <li className="text-error font-medium">
                  <a onClick={handleSignOut}>
                    <LogOut size={18} /> Sign Out
                  </a>
                </li>
              ) : (
                <li className="text-error font-medium">
                  <NavLink to="login">
                    <LogIn size={18} /> Sign In
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
