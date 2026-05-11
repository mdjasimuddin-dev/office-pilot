import React, { useEffect, useState } from "react";
import {
  CheckCircle2, XCircle, Clock, Send, BellRing,
  ExternalLink, Users, DollarSign, Calendar, UserCheck, Briefcase, Timer
} from "lucide-react";
import useAxiosSecure from "../../../../Hooks/AxiosSecure";
import Swal from "sweetalert2";
import moment from "moment"; // npm install moment

const ProjectTimeline = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(moment());
  const axiosSecure = useAxiosSecure();

  // প্রতি সেকেন্ডে কারেন্ট টাইম আপডেট হবে (কাউন্টডাউন এর জন্য)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(moment()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axiosSecure.get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ৪৮ ঘণ্টা লজিক
  const isWithin48Hours = (dateString) => {
    const diffInHours = Math.abs(moment().diff(moment(dateString), 'hours'));
    return diffInHours <= 48;
  };

  const filteredProjects = projects.filter((p) => isWithin48Hours(p.updatedAt || p.date));

  const handleAction = (type, projectName) => {
    Swal.fire({
      title: 'Action Triggered!',
      text: `${type} sent successfully for ${projectName}`,
      icon: 'success',
      confirmButtonColor: '#3b82f6'
    });
  };

  if (loading) return <div className="p-20 text-center font-bold text-blue-600 animate-pulse text-xl">Loading Pulse Dashboard...</div>;

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">PROJECT <span className="text-blue-600">PULSE</span></h1>
          <p className="text-slate-500 font-medium mt-1">Real-time snapshots from the last 48 hours</p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              // কার্ড লেভেলের ডেটা প্রসেসিং
              const isCancelled = project.status === "cancelled";
              const isDelivered = project.status === "delivered" || project.status === "completed";
              
              // কাউন্টডাউন লজিক
              const end = moment(project.deadline);
              const duration = moment.duration(end.diff(currentTime));
              const timeLeft = duration.asSeconds() <= 0 ? "Expired" : 
                `${Math.floor(duration.asDays())}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
              const isUrgent = duration.asDays() < 1 && duration.asSeconds() > 0;

              return (
                <div key={project._id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col relative">
                  {/* Status Bar */}
                  <div className={`h-2 w-full ${isCancelled ? 'bg-rose-500' : isDelivered ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                  
                  <div className="p-7 flex-1">
                    {/* Header Info */}
                    <div className="flex justify-between items-center mb-6">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${isCancelled ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                        {project.status}
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold ${isUrgent ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-indigo-50 text-indigo-600'}`}>
                        <Timer size={14} /> {timeLeft}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors truncate">
                      {project.projectName}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-6 text-slate-400">
                      <Briefcase size={14} />
                      <span className="text-xs font-bold uppercase tracking-widest">{project.category || "Development"}</span>
                    </div>

                    {/* Detailed Information Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50/80 p-5 rounded-3xl border border-slate-100">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                          <UserCheck size={12}/> Client
                        </span>
                        <p className="text-xs font-bold text-slate-700 truncate">{project.clientInfo?.name || "N/A"}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                          <Users size={12}/> Team
                        </span>
                        <p className="text-xs font-bold text-slate-700 truncate">{project.teamName || "Alpha Team"}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                          <Calendar size={12}/> Started
                        </span>
                        <p className="text-xs font-bold text-slate-700">{moment(project.date).format("MMM DD, YY")}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                          <Clock size={12}/> Deadline
                        </span>
                        <p className="text-xs font-bold text-slate-700">{moment(project.deadline).format("MMM DD, YY")}</p>
                      </div>
                    </div>

                    {/* Assigned & Budget */}
                    <div className="flex items-center justify-between mb-8 px-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={project.sellerInfo?.image || "https://i.ibb.co/3p95XJq/user.png"} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Assigned To</p>
                          <p className="text-sm font-bold text-slate-700">{project.assignWork || "No Assigned"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Budget</p>
                        <p className="text-lg font-black text-blue-600">
                          {project.budget?.currency || "$"}{project.budget?.amount}
                        </p>
                      </div>
                    </div>

                    {/* Premium Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleAction('Email', project.projectName)}
                        className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                      >
                        <Send size={14} /> SEND EMAIL
                      </button>
                      <button 
                        onClick={() => handleAction('Team Notice', project.projectName)}
                        className="flex items-center justify-center gap-2 py-4 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black hover:bg-blue-100 transition-all active:scale-95"
                      >
                        <BellRing size={14} /> TEAM NOTICE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-24 text-center">
            <Clock className="mx-auto text-slate-200 mb-6" size={60} />
            <p className="text-slate-400 font-black text-2xl tracking-tight uppercase">No Activity in 48H Window</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline;