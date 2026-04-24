import { Outlet } from "react-router";
import Navbar from "./../components/Navbar/navbar";
import SideMenu from "../components/SideMenu/SideMenu";

export default function MainLayout() {
  return (
    <div className="mx-28">
      <Navbar />
      <div className="flex">
        <div className="w-72 pt-5 bg-[#233D4D] min-h-screen">
          <SideMenu />
        </div>

        <div className="w-full min-h-screen bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
