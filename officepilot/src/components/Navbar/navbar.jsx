import { MdSearch, MdNotificationsNone, MdKeyboardArrowDown } from "react-icons/md";
import logo from "./../../assets/logo.png"; // আপনার লোগো পাথ

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      {/* Container limited to 1600px to match MainLayout */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
        
        {/* Left Side: Brand/Context */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Active</span>
          </div>
        </div>

        {/* Center: Search Bar (Refined width) */}
        <div className="hidden md:flex flex-1 max-w-md mx-10">
          <div className="relative w-full group">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-[#FE7F2D] transition-colors" />
            <input 
              type="text" 
              placeholder="Search projects, tasks..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#FE7F2D] transition-all"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Notifications */}
          <button className="relative p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-orange-50 hover:text-[#FE7F2D] transition-all group">
            <MdNotificationsNone className="text-2xl" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
          </button>

          {/* Vertical Divider */}
          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800 leading-tight">Md Jasim Uddin</p>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">Administrator</p>
            </div>
            <div className="relative">
              <img 
                src="https://i.pravatar.cc/150?u=jasim" 
                className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-sm group-hover:border-orange-200 transition-all" 
                alt="Profile" 
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <MdKeyboardArrowDown className="text-slate-400 group-hover:text-slate-800 transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;