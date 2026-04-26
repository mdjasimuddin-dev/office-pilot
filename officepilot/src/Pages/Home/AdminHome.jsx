import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {FaRocket, FaClock, FaCheckDouble, FaExclamationTriangle, FaArrowUp} from "react-icons/fa";
import { Link } from "react-router";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import useAxiosSecure from "../../Hooks/AxiosSecure";

// ডামি চার্ট ডাটা
const data = [
  { name: "Sat", sales: 400 },
  { name: "Sun", sales: 700 },
  { name: "Mon", sales: 500 },
  { name: "Tue", sales: 900 },
  { name: "Wed", sales: 1100 },
];

const user = "Md Jasim Uddin";

export default function AdminHome() {
  const [projects, setProjects] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/projects")
      .then((data) => setProjects(data.data));
  }, []);

  const liveProject = projects.filter((p) => p.status === "Active");
  const CompleteProject = projects.filter((p) => p.status === "Completed");

  // Last 48 Hour left project
  const now = new Date();
  const next48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const deadlineProjects = projects.filter((p) => {
    const projectDeadline = new Date(p.deadline);
    return (
      p.status === "Active" &&
      projectDeadline > now &&
      projectDeadline <= next48Hours
    );
  });

  const lateProjects = projects.filter((p) => {
    const projectDeadline = new Date(p.deadline);
    return p.status === "Active" && projectDeadline < now;
  });

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-screen font-sans text-gray-800">
      {/* Header: Greeting & Quick Action */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Welcome Back, <span className="text-orange-600">{user}</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Link
          to="/add-project"
          className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1"
        >
          + New Report
        </Link>
      </div>

      {/* Stats Section: Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaRocket />}
          label="Active Projects"
          value={liveProject.length}
          trend="+12%"
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaClock />}
          label="Deadlines"
          value={deadlineProjects.length}
          trend="Next 48h"
          color="bg-orange-500"
        />
        <StatCard
          icon={<FaCheckDouble />}
          label="Completed"
          value={CompleteProject.length}
          trend="+5%"
          color="bg-green-500"
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          label="Late"
          value={lateProjects.length}
          trend="Needs Attention"
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Side: Performance Analytics (Chart) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Revenue Analytics</h3>
            <select className="bg-gray-50 border-none text-sm font-bold rounded-xl px-4 py-2 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Recent Activity Feed */}
        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <ActivityItem
              name="Rahim Khan"
              task="Landing Page Redesign"
              time="2h ago"
              status="Review"
            />
            <ActivityItem
              name="Karim Ahmed"
              task="API Integration"
              time="5h ago"
              status="Done"
            />
            <ActivityItem
              name="Nusrat Jahan"
              task="Mobile UI Fix"
              time="1d ago"
              status="Working"
            />
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-orange-600 bg-orange-50 rounded-2xl hover:bg-orange-100">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, label, value, trend, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div
          className={`${color} p-4 rounded-2xl text-white shadow-lg shadow-opacity-20`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            {label}
          </p>
          <h2 className="text-2xl font-black">{value}</h2>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      </div>
    </motion.div>
  );
}

// Reusable Activity Item Component
function ActivityItem({ name, task, time, status }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800">{name}</h4>
        <p className="text-xs text-gray-400 font-medium">{task}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-300 font-bold mb-1 uppercase">
          {time}
        </p>
        <span
          className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase ${
            status === "Done"
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
