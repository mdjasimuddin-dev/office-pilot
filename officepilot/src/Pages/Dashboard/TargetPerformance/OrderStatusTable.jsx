import React, { useState } from "react";
import { FaCheckCircle, FaTruck, FaTimesCircle, FaFilter, FaSearch } from "react-icons/fa";

export default function OrderStatusTable() {
  const [filter, setFilter] = useState("All");

  const orders = [
    { id: "#ORD-991", client: "John Doe", amount: 150, status: "Delivered", member: "Rahim", date: "12 Jan" },
    { id: "#ORD-992", client: "Sarah W.", amount: 300, status: "Completed", member: "Nusrat", date: "10 Jan" },
    { id: "#ORD-993", client: "Alex P.", amount: 80, status: "Cancelled", member: "Sajid", date: "08 Jan" },
    { id: "#ORD-994", client: "Mike R.", amount: 450, status: "Delivered", member: "Karim", date: "14 Jan" },
  ];

  // ফিল্টার লজিক
  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-8 bg-white rounded-[3rem] shadow-sm border border-gray-100">
      {/* Table Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Order Performance</h3>
          <p className="text-sm text-gray-400 font-medium">Track your agency's order flow and status</p>
        </div>

        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          {["All", "Delivered", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === tab ? "bg-white text-orange-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.15em] border-b border-gray-50">
              <th className="pb-4 pl-4 text-center">Order ID</th>
              <th className="pb-4">Client</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Handled By</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-5 pl-4 text-center">
                   <span className="text-xs font-black text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    {order.id}
                   </span>
                </td>
                <td className="py-5">
                  <p className="text-sm font-bold text-gray-800">{order.client}</p>
                </td>
                <td className="py-5 font-black text-sm text-gray-700">${order.amount}</td>
                <td className="py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                      {order.member.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-gray-500">{order.member}</span>
                  </div>
                </td>
                <td className="py-5">
                  <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit ${
                    order.status === "Completed" ? "bg-green-100 text-green-600" :
                    order.status === "Delivered" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
                  }`}>
                    {order.status === "Completed" && <FaCheckCircle />}
                    {order.status === "Delivered" && <FaTruck />}
                    {order.status === "Cancelled" && <FaTimesCircle />}
                    {order.status}
                  </span>
                </td>
                <td className="py-5 text-xs font-bold text-gray-400">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}