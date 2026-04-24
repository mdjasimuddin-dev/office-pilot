import React from "react";
import { FaPlus, FaEllipsisV, FaEnvelope, FaBriefcase, FaChartLine } from "react-icons/fa";

export default function MemberCard({
  employee,
  onAction,
  actionLabel = "View Profile",
}) {
  return (
    <div>
      {" "}
      {/* Members Grid */}
      <div className="">
        <div
          key={employee.id}
          className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
        >
          {/* Action Dropdown Icon */}
          <div className="absolute top-5 right-5 text-gray-300 hover:text-gray-600 cursor-pointer">
            <FaEllipsisV />
          </div>

          <div className="flex flex-col items-center">
            {/* Avatar with Status Ring */}
            <div
              className={`avatar ${
                employee.status === "Available" ? "online" : "busy"
              } mb-4`}
            >
              <div className="w-24 rounded-full ring ring-gray-100 ring-offset-base-100 ring-offset-4 group-hover:ring-orange-200 transition-all">
                <img src={employee.image} alt={employee.name} />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-xl font-extrabold text-gray-800">
              {employee.name}
            </h3>
            <p className="text-sm text-blue-500 font-semibold mb-4">
              {employee.role}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  employee.status === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {employee.status}
              </span>
            </div>

            {/* Project Stats Mini Card */}
            <div className="grid grid-cols-2 gap-4 w-full bg-gray-50 p-4 rounded-2xl mb-6">
              <div className="text-center border-r border-gray-200">
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Ongoing
                </p>
                <p className="text-lg font-black text-gray-700">
                  {employee.activeProjects}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Success
                </p>
                <p className="text-lg font-black text-green-600">
                  {employee.successRate}%
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-2 w-full">
              <button
                onClick={() => onAction(employee)}
                className="w-full bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-600 font-bold py-2 rounded-xl text-sm transition-all duration-300"
              >
                {actionLabel}
              </button>
              <button className="btn btn-sm btn-outline border-gray-200 rounded-xl hover:bg-gray-100">
                <FaEnvelope className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
