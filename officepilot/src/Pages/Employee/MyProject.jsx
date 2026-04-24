import { useEffect, useState } from "react";
import {
  CalendarDays,
  ArrowUpRight,
  Briefcase,
  Clock,
  Timer,
  ShieldCheck,
  Zap,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [now, setNow] = useState(new Date());

  const navigate = useNavigate();

  const currentUser = "Imran Khan";

  useEffect(() => {
    fetch("/project.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));

    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getCountdown = (deadline) => {
    const target = new Date(deadline);
    const diff = target - now;
    if (diff <= 0) return { expired: true };

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / 1000 / 60) % 60),
      s: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  };

  const myAssignedProjects = projects.filter(
    (p) => p.teamMember?.name === currentUser
  );

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              My Workspace
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Active assignments for{" "}
              <span className="text-indigo-600 font-bold">{currentUser}</span>
            </p>
          </div>
          <div className="hidden md:block bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 text-sm font-bold text-slate-600">
            Total: {myAssignedProjects.length} Projects
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {myAssignedProjects.map((project) => {
            const time = getCountdown(project.deadline);
            // console.log(project)
            return (
              <div
                key={project.projectId}
                onClick={() =>
                  navigate(`/member-project-details/${project.projectId}`)
                }
                className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.2)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Background Glow Decor */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Header: Icon & Category */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <Briefcase className="text-white w-7 h-7" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {project.category || "Pilot Phase"}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Zap size={12} className="text-amber-500" />{" "}
                      {project.priority || "Normal"}
                    </div>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-black text-slate-800 mb-6 leading-tight group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>

                {/* Modern Countdown Timer */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <Timer size={14} /> Time Remaining
                  </div>
                  <div className="flex gap-2">
                    {!time.expired ? (
                      ["d", "h", "m", "s"].map((unit) => (
                        <div
                          key={unit}
                          className="flex-1 bg-slate-50 rounded-2xl p-2 text-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors"
                        >
                          <p className="text-lg font-black text-slate-800 group-hover:text-indigo-700 font-mono leading-none">
                            {time[unit]}
                          </p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">
                            {unit === "d"
                              ? "Days"
                              : unit === "h"
                              ? "Hrs"
                              : unit === "m"
                              ? "Min"
                              : "Sec"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="w-full bg-rose-50 text-rose-600 py-3 rounded-2xl text-center font-bold text-sm border border-rose-100">
                        Deadline Passed
                      </div>
                    )}
                  </div>
                </div>

                {/* Date Grid */}
                <div className="flex justify-between items-center mb-8 px-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                      <Clock size={12} /> Started
                    </p>
                    <p className="text-sm font-extrabold text-slate-700">
                      {project.startDate || "Jan 12, 24"}
                    </p>
                  </div>
                  <div className="h-6 w-[1.5px] bg-slate-100"></div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-tight flex items-center gap-1 justify-end">
                      Deadline <CalendarDays size={12} />
                    </p>
                    <p className="text-sm font-extrabold text-slate-700">
                      {new Date(project.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-slate-900 text-white py-4 rounded-[1.5rem] font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all active:scale-95 group/btn overflow-hidden relative">
                  <span className="relative z-10">View Project Details</span>
                  <ArrowUpRight
                    size={18}
                    className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
