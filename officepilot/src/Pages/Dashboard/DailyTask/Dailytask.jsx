import React, { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCommentDots,
  FaExclamationCircle,
  FaUserCircle,
} from "react-icons/fa";
import { MdOutlineAttachment } from "react-icons/md";

export default function DailyTask() {
  const [selectedMember, setSelectedMember] = useState("All");

  // ডামি টাস্ক ডাটা
  const tasks = [
    {
      id: 1,
      memberName: "Rahim Khan",
      avatar: "https://i.pravatar.cc/150?u=1",
      projectName: "E-commerce App",
      taskTitle: "Homepage API Integration",
      description:
        "Finished connecting the product list API and handled the loading states with skeletons.",
      link: "https://github.com/project/pull/42",
      timeSpent: "4h 30m",
      status: "Pending",
      submittedAt: "10:30 AM",
    },
    {
      id: 2,
      memberName: "Nusrat Jahan",
      avatar: "https://i.pravatar.cc/150?u=5",
      projectName: "Real Estate Web",
      taskTitle: "Property Search Filter",
      description:
        "Added range slider for price filtering and category-based sorting.",
      link: "https://realestate-demo.com",
      timeSpent: "6h 15m",
      status: "Reviewed",
      submittedAt: "12:45 PM",
    },
  ];

  return (
    <div className="flex h-[85vh] bg-gray-50 m-5 rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
      {/* Left Sidebar: Member Filter */}
      <div className="w-1/4 bg-white border-r border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Members</h3>
        <div className="space-y-2">
          {[
            "All",
            "Rahim Khan",
            "Nusrat Jahan",
            "Karim Ahmed",
            "Sajid Hossain",
          ].map((name) => (
            <button
              key={name}
              onClick={() => setSelectedMember(name)}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all ${
                selectedMember === name
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200 font-bold"
                  : "text-gray-500 hover:bg-orange-50"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Task Feed */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#fdfdfd]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-800">
            Daily Task Updates
          </h2>
          <div className="text-sm font-bold text-gray-400">
            Date: 14 January, 2026
          </div>
        </div>

        <div className="space-y-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-2xl">
                      <img src={task.avatar} alt="" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {task.memberName}
                    </h4>
                    <p className="text-xs text-orange-500 font-bold uppercase tracking-tighter">
                      {task.projectName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <FaClock /> {task.submittedAt}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-extrabold text-gray-700 mb-2">
                  {task.taskTitle}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-dashed">
                  {task.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-between items-center gap-4 border-t pt-6">
                <div className="flex gap-4 items-center">
                  <a
                    href={task.link}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl hover:bg-blue-100"
                  >
                    <MdOutlineAttachment size={16} /> Work Link
                  </a>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-2 rounded-xl">
                    Spent: {task.timeSpent}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none rounded-xl gap-2">
                    <FaCheckCircle /> Approve
                  </button>
                  <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none rounded-xl gap-2">
                    <FaCommentDots /> Comment
                  </button>
                  <button className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-600 border-none rounded-xl gap-2">
                    <FaExclamationCircle /> Revision
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
