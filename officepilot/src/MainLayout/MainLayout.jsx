import { Outlet } from "react-router";
import Navbar from "./../components/Navbar/navbar";
import SideMenu from "../components/SideMenu/SideMenu";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ১. ন্যাভবার - এটি সবসময় উপরে থাকবে */}
      <Navbar />

      <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto">
        
        {/* ২. সাইডবার সেকশন */}
        {/* ল্যাপটপে এটি ফিক্সড উইথ (w-64/72), মোবাইলে এটি SideMenu এর ভিতরের ড্রয়ার দিয়ে হ্যান্ডেল হবে */}
        <aside className="lg:block">
          <SideMenu />
        </aside>

        {/* ৩. মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 w-full min-h-screen p-4 md:p-6 lg:p-10 transition-all duration-300">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-4 md:p-8 min-h-[85vh]">
            <Outlet />
          </div>

          {/* মোবাইল ডিভাইসের জন্য নিচের দিকে এক্সট্রা প্যাডিং বা ফুটার শর্টকাট */}
          <footer className="mt-10 pb-6 text-center lg:hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              MJ SOFT Office Pilot • 2026
            </p>
          </footer>
        </main>
        
      </div>
    </div>
  );
}