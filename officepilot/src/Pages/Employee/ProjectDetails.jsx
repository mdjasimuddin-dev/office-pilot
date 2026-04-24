import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router";
import {
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaExternalLinkAlt,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { MdOutlineTimer, MdMessage, MdAssignment } from "react-icons/md";
import InteractiveTimeline from "./TimeLine";

export default function ProjectDetails() {
  const { id } = useParams();
  const allProject = useLoaderData();

  const [showPass, setShowPass] = useState(false);
  const [showUser, setShowUser] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const project = allProject.find((p) => p.projectId === id);
  console.log(project);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdown = (deadline) => {
    const diff = new Date(deadline) - currentTime;
    if (diff <= 0) return "Time Over";
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${d}d : ${h}h : ${m}m : ${s}s`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {project.projectName}
          </h1>
          <p className="text-gray-500 font-medium">
            Order ID: {project.orderId}
          </p>
        </div>
        <div className="text-right">
          <span className="badge badge-primary p-3 font-bold">IN PROGRESS</span>
          <p className="text-sm text-gray-400 mt-1">
            Started: {project.startedDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Client & Credentials */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">
              Client Info
            </h3>
            <div className="space-y-3 text-sm">
              <p className="flex justify-between">
                <span>Name:</span> <b>{project.clientInfo.name}</b>
              </p>
              <p className="flex justify-between text-green-600">
                <span>Fiverr:</span>
                <a href="#" className="flex items-center gap-1 font-bold">
                  @{project.clientInfo.fiverrUsername}{" "}
                  <FaExternalLinkAlt size={10} />
                </a>
              </p>
              <p className="flex justify-between font-bold text-orange-600">
                <span>Budget:</span> ${project.budget.amount}
              </p>
            </div>
          </div>

          <div className="bg-[#1e293b] text-white p-5 rounded-3xl shadow-lg">
            <h3 className="font-bold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2">
              Access Info
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-gray-400 mb-1">Domain</p>
                <div className="flex justify-between bg-gray-800 p-2 rounded">
                  <span>{project.accessInfo.domain}</span>
                  <FaCopy className="cursor-pointer hover:text-blue-400" />
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-1">WP-Admin User</p>
                <div className="flex justify-between bg-gray-800 p-2 rounded items-center">
                  <span>
                    {showUser
                      ? project.accessInfo.wpAdminUser
                      : "Not user create"}
                  </span>
                  <FaCopy className="cursor-pointer hover:text-blue-400" />
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-1">WP-Admin Pass</p>
                <div className="flex justify-between bg-gray-800 p-2 rounded items-center">
                  <span>
                    {showPass ? project.accessInfo.wpAdminPass : "••••••••"}
                  </span>
                  <div className="flex gap-2">
                    {showPass ? (
                      <FaEyeSlash
                        onClick={() => setShowPass(false)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <FaEye
                        onClick={() => setShowPass(true)}
                        className="cursor-pointer"
                      />
                    )}
                    <FaCopy className="cursor-pointer hover:text-blue-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-400">
                Hosting:{" "}
                <span className="text-white">{project.accessInfo.hosting}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Middle Column: Progress & Communication */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-gray-500 uppercase tracking-widest text-xs mb-2">
              Order Left Time
            </h2>
            <div className="text-4xl font-black font-mono text-red-500 bg-red-50 py-4 rounded-2xl">
              {getCountdown(project.deadline)}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Work Progress</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {project.progress}% Complete
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-blue-100">
                <div
                  style={{ width: `${project.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <MdMessage /> Last Update Sent
            </h3>
            <p className="text-sm italic text-blue-700">
              "{project.lastMessage}"
            </p>
            <button className="btn btn-sm btn-primary mt-4 rounded-full">
              Update Message
            </button>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
              <MdAssignment className="text-blue-500" /> Daily Work Log
            </h3>
            <textarea
              className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm h-32 focus:ring-2 focus:ring-orange-500/20 placeholder:text-gray-300"
              placeholder="What have you completed today? Briefly explain..."
            ></textarea>
            <button className="w-full mt-4 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-gray-200">
              <FaPaperPlane size={14} /> Send Update to Admin
            </button>
          </div>
        </div>

        {/* Right Column: Team & Activity */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Project Seller Info  */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Seller Info</h3>

            <div className="flex items-center gap-4 bg-white rounded-xl ">
              <img
                src={project.sellerInfo.image}
                alt={project.sellerInfo.name}
                className="w-16 h-16 rounded-full border-2 border-orange-500"
              />
              <div>
                <h3 className="text-lg font-bold">{project.sellerInfo.name}</h3>
                <p className="text-sm text-gray-500">
                  {project.sellerInfo.role}
                </p>
                <div className="flex items-center gap-1 text-orange-500 text-xs">
                  <span>★ {project.sellerInfo.rating}</span>
                  <span className="text-gray-400">
                    ({project.sellerInfo.totalOrders} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Leader Info  */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">My Team Leader</h3>

            <div className="flex items-center gap-4 bg-white rounded-xl ">
              <img
                src={project.sellerInfo.image}
                alt={project.sellerInfo.name}
                className="w-16 h-16 rounded-full border-2 border-orange-500"
              />
              <div>
                <h3 className="text-lg font-bold">{project.sellerInfo.name}</h3>
                <p className="text-sm text-gray-500">
                  {project.sellerInfo.role}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Activity Timeline</h3>
            <ul className="steps steps-vertical text-sm">
              {project.activityTimeline
                .filter((item) => item.status === "completed") // Shudhu mark kora gulo dekhabe
                .map((step, index) => (
                  <li
                    key={step.id}
                    className="step step-primary text-xs font-medium animate-fade-in"
                  >
                    <div className="text-left ml-2">
                      <p className="font-bold text-gray-800">{step.title}</p>
                      <p className="text-[10px] text-gray-400">Completed</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div> */}

          <InteractiveTimeline />

           <button className="btn btn-error btn-block text-white rounded-2xl">
            Mark as Completed
          </button>

        </div>
      </div>
    </div>
  );
}
