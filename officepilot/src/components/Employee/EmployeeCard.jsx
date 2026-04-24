import React from "react";
import { FaBriefcase, FaUserTag } from "react-icons/fa";

const EmployeeCard = ({ employee, onAction, actionLabel = "View Profile" }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* প্রোফাইল ইমেজ এবং অনলাইন স্ট্যাটাস */}
          <div className="relative">
            <img
              src={
                employee?.image ||
                "https://i.ibb.co/3S3mH37/profile-placeholder.png"
              }
              alt={employee?.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-50 group-hover:ring-blue-100 transition-all"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <h3 className="text-gray-800 font-bold text-base group-hover:text-blue-600 transition-colors">
              {employee?.name}
            </h3>
            <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
              <FaBriefcase className="text-gray-400" /> {employee?.role}
            </p>
          </div>
        </div>

        {/* মেম্বার টাইপ ট্যাগ (যেমন: Lead বা Member) */}
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
            employee?.type === "Leader"
              ? "bg-orange-100 text-orange-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {employee?.type || "Member"}
        </span>
      </div>

      {/* <hr className="border-1 border-gray-200 mt-5" /> */}

      {/* <div
        className={`avatar my-3 flex flex-col items-center ${
          employee.status === "Available" ? "online" : "busy"
        }`}
      >
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            employee.status === "Available"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {employee.status}
        </span>
      </div> */}

      <div className="pt-4 mt-2 border-t border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase font-medium">
              Dept
            </p>
            <p className="text-xs font-semibold text-gray-700">
              {employee?.department}
            </p>
          </div>
          <div className="text-center border-x border-gray-100 px-4">
            <p className="text-[10px] text-gray-400 uppercase font-medium">
              Projects
            </p>
            <p className="text-xs font-semibold text-gray-700">
              {employee?.activeProjects || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase font-medium">
              Rating
            </p>
            <p className="text-xs font-semibold text-orange-500">
              ★ {employee?.rating || "5.0"}
            </p>
          </div>
        </div>

        {/* Action Button */}

      
        <button
          onClick={() => onAction(employee)}
          className="w-full bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-600 font-bold py-2 rounded-xl text-sm transition-all duration-300"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
