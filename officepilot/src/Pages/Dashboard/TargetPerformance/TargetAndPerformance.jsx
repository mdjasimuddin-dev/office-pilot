import React from "react";
import { FaBullseye, FaCheckDouble, FaTimesCircle, FaTools, FaArrowUp, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TargetAndPerformance() {
  const stats = [
    { label: "Monthly Target", value: "$5,000", sub: "Goal for Jan", icon: <FaBullseye />, color: "bg-blue-500" },
    { label: "Achieved", value: "$3,200", sub: "64% Completed", icon: <FaCheckDouble />, color: "bg-green-500" },
    { label: "Cancelled", value: "$450", sub: "3 Orders lost", icon: <FaTimesCircle />, color: "bg-red-500" },
    { label: "Avg. Delivery", value: "1.2 Days", sub: "Team Speed", icon: <FaCalendarCheck />, color: "bg-purple-500" },
  ];

  const issueList = [
    { id: 1, project: "Real Estate App", issue: "Responsive fix in Login", member: "Rahim", status: "In Progress" },
    { id: 2, project: "E-comm Web", issue: "Payment gateway error", member: "Nusrat", status: "Fixed" },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-800">Target & Analytics</h1>
        <p className="text-gray-500">Track your agency's financial goals and project issues.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-opacity-20`}>
              {item.icon}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
            <h2 className="text-2xl font-black text-gray-800 mt-1">{item.value}</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-2 italic">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Phase Progress (10, 20, 30 Days Target) */}
        <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaArrowUp className="text-orange-500"/> Monthly Delivery Phases
          </h3>
          <div className="space-y-8">
            <PhaseProgress label="Phase 1 (Day 1-10)" target="$1500" achieved="$1200" color="bg-orange-500" />
            <PhaseProgress label="Phase 2 (Day 11-20)" target="$2000" achieved="$1800" color="bg-blue-500" />
            <PhaseProgress label="Phase 3 (Day 21-30)" target="$1500" achieved="$200" color="bg-gray-200" />
          </div>
        </div>

        {/* Issue Tracker (Existing Project Notes) */}
        <div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaTools className="text-red-500"/> Critical Issues
          </h3>
          <div className="space-y-4">
            {issueList.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-gray-800">{item.project}</h4>
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-black uppercase ${item.status === 'Fixed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3 italic">"{item.issue}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <span className="text-[10px] font-bold text-gray-400">Fixed by: {item.member}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function PhaseProgress({ label, target, achieved, color }) {
  const percentage = (parseInt(achieved.replace('$', '')) / parseInt(target.replace('$', ''))) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800">{achieved} / {target}</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}