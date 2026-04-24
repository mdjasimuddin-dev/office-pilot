import React from "react";
import { FaCheckCircle, FaWallet, FaGift, FaTasks } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";

export default function MyWork() {
  // ডামি ডাটা (পরবর্তীতে API থেকে আসবে)
  const stats = {
    totalProjects: 14,
    totalEarnings: 850,
    totalBonus: 50,
    month: "January 2026",
  };

  const projectHistory = [
    {
      id: 1,
      name: "E-commerce Website",
      date: "Jan 05",
      amount: 150,
      bonus: 10,
      status: "Paid",
    },
    {
      id: 2,
      name: "LMS Portal Development",
      date: "Jan 12",
      amount: 300,
      bonus: 20,
      status: "Paid",
    },
    {
      id: 3,
      name: "Portfolio Redesign",
      date: "Jan 14",
      amount: 100,
      bonus: 0,
      status: "Processing",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            My Work History
          </h1>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
            {stats.month}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-black text-xs">
          <MdTrendingUp size={18} /> PERFORMANCE: EXCELLENT
        </div>
      </div>

      {/* --- TOP STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          icon={<FaTasks />}
          label="Completed Projects"
          value={stats.totalProjects}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaWallet />}
          label="Total Earnings"
          value={`$${stats.totalEarnings}`}
          color="bg-[#5D3FD3]"
        />
        <StatCard
          icon={<FaGift />}
          label="Total Bonus"
          value={`$${stats.totalBonus}`}
          color="bg-orange-500"
        />
      </div>

      {/* --- PROJECT LIST TABLE --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="font-black text-gray-800">Monthly Project Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Date
                </th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Project Name
                </th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Amount
                </th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                  Bonus
                </th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projectHistory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-5 text-xs font-bold text-gray-400">
                    {item.date}
                  </td>
                  <td className="p-5 text-sm font-black text-gray-800">
                    {item.name}
                  </td>
                  <td className="p-5 text-sm font-black text-center text-[#5D3FD3]">
                    ${item.amount}
                  </td>
                  <td className="p-5 text-sm font-black text-center text-orange-500">
                    ${item.bonus}
                  </td>
                  <td className="p-5 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-5">
      <div
        className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-opacity-20`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">
          {label}
        </p>
        <p className="text-2xl font-black text-gray-800 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
