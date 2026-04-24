import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaExternalLinkAlt,
  FaUserCircle,
  FaLink,
  FaUserPlus,
  FaComments,
  FaPencilAlt,
} from "react-icons/fa";
import { MdOutlineTimer, MdMessage } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/AxiosSecure";

/* ─── Priority config ─────────────────────────────── */
const PRIORITY_CONFIG = {
  High: {
    dot: "bg-red-500",
    text: "text-red-600",
    bg: "bg-red-50",
    label: "High",
  },
  Medium: {
    dot: "bg-yellow-400",
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    label: "Medium",
  },
  Low: {
    dot: "bg-green-500",
    text: "text-green-600",
    bg: "bg-green-50",
    label: "Low",
  },
};

/* ─── Role check (পরে auth থেকে আসবে) ────────────── */
const CURRENT_USER_ROLE = "leader"; // "leader" | "member"

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [project, setProject] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showHostPass, setShowHostPass] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/project/${id}`)
      .then((res) => setProject(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const countdown = (deadline) => {
    const diff = new Date(deadline) - currentTime;
    if (!deadline || diff <= 0) return "Time Over";
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${d}d : ${h}h : ${m}m : ${s}s`;
  };

  const copy = (val, key) => {
    navigator.clipboard.writeText(val || "");
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 text-sm">
        Loading project...
      </div>
    );

  const pc = PRIORITY_CONFIG[project.priority] || PRIORITY_CONFIG.Medium;



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ══════════ HEADER ══════════ */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {project.projectName}
            </h1>
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${pc.bg} ${pc.text}`}
            >
              <span className={`w-2 h-2 rounded-full ${pc.dot}`} />
              {pc.label} Priority
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 mt-1">
            <span>
              Order: <b className="text-gray-700">{project.orderId}</b>
            </span>
            <span>
              ID: <b className="text-gray-700">{project.projectId}</b>
            </span>
            <span>
              Started: <b className="text-gray-700">{project.startedDate}</b>
            </span>
            <span>
              Dept: <b className="text-gray-700">{project.department}</b>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="badge badge-primary p-3 font-bold">
            {project.status}
          </span>
          {/* ── Action Buttons ── */}
          <div className="flex gap-2 mt-1">
            {/* Share Update — সব user দেখবে */}
            <button
              onClick={() => navigate(`/update/${id}`)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95"
            >
              <FaPencilAlt size={12} /> Share Update
            </button>
            {/* Assign Member — শুধু leader দেখবে */}
            {CURRENT_USER_ROLE === "leader" && (
              <button
                onClick={() =>
                  navigate(`/all-employee/${project.projectId}`)
                }
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95"
              >
                <FaUserPlus size={12} /> Assign Member
              </button>
            )}
            {/* Live Chat */}
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95">
              <FaComments size={12} /> Live Chat
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ══════════ LEFT COLUMN ══════════ */}
        <div className="col-span-12 lg:col-span-3 space-y-5">
          {/* Client Info */}
          <Card title="Client Info">
            <InfoRow label="Name" value={project.clientInfo?.name} />
            <InfoRow label="Country" value={project.clientInfo?.country} />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Fiverr</span>
              <a
                href={project.clientInfo?.fiverrProfileLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-bold text-green-600 text-xs"
              >
                @{project.clientInfo?.fiverrUsername || "—"}{" "}
                <FaExternalLinkAlt size={9} />
              </a>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-orange-600">
              <span>Budget</span>
              <span>
                {project.budget?.currency}
                {project.budget?.amount}
              </span>
            </div>
          </Card>

          {/* Seller Info */}
          <Card title="Seller">
            <div className="flex items-center gap-3">
              {project.sellerInfo?.image ? (
                <img
                  src={project.sellerInfo.image}
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
                />
              ) : (
                <FaUserCircle size={44} className="text-gray-200" />
              )}
              <div>
                <p className="font-bold text-gray-800 text-sm">
                  {project.sellerInfo?.name || "—"}
                </p>
                <p className="text-xs text-gray-500">
                  {project.sellerInfo?.role}
                </p>
                <p className="text-xs text-gray-400">
                  {project.sellerInfo?.location}
                </p>
              </div>
            </div>
          </Card>

          {/* Team */}
          <Card title="Team">
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Leader
                </p>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
                  <FaUserCircle className="text-orange-400" size={22} />
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {project.teamLeader?.name || "—"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {project.teamLeader?.role}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Member
                </p>
                {project.assignWork &&
                project.assignWork !== "Unassign" ? (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
                    <FaUserCircle className="text-blue-400" size={22} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {project.assignWork}
                      </p>
                      <p className="text-xs text-gray-400">
                        {project.role}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl">
                    Not assigned yet
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Requirement Link */}
          {project.requirement && (
            <Card title="Requirement">
              <a
                href={project.requirement}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-600 font-bold text-xs hover:underline break-all"
              >
                <FaLink size={11} /> {project.requirement}
              </a>
            </Card>
          )}
        </div>

        {/* ══════════ MIDDLE COLUMN ══════════ */}
        <div className="col-span-12 lg:col-span-5 space-y-5">
          {/* Countdown */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-gray-400 uppercase tracking-widest text-[10px] mb-3 flex items-center justify-center gap-1">
              <MdOutlineTimer /> Deadline Countdown
            </h2>
            <div
              className={`text-3xl font-black font-mono py-4 rounded-2xl ${
                countdown(project.deadline) === "Time Over"
                  ? "text-gray-400 bg-gray-50"
                  : "text-red-500 bg-red-50"
              }`}
            >
              {countdown(project.deadline)}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Deadline:{" "}
              {project.deadline
                ? new Date(project.deadline).toLocaleString()
                : "—"}
            </p>
          </div>

          {/* Progress */}
          <Card title="Work Progress">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {project.progress ?? 0}% Complete
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div
                style={{ width: `${project.progress ?? 0}%` }}
                className="h-full bg-blue-500 transition-all duration-700 rounded-full"
              />
            </div>
          </Card>

          {/* ── Update Log ── */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <h3 className="block font-bold text-gray-700 mb-4 flex items-center gap-2">
                <MdMessage className="text-blue-400" /> Project Updates
              </h3>

              <p className=" text-xs">
                Last Update: {project?.updatedAt ? formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }) : "N/A"}
              </p>
            </div>

            {project.updates?.length > 0 ? (
              <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {[...project.updates].reverse().map((u, i) => (
                  <li key={i} className="border-l-4 border-blue-200 pl-3 py-1">
                    <p className="text-xs text-gray-400 mb-0.5">
                      {new Date(u.date).toLocaleString()} —{" "}
                      <b className="text-gray-600">{u.author}</b>
                    </p>
                    <p className="text-sm text-gray-700">{u.message}</p>
                    {u.progress !== undefined && (
                      <span className="text-[10px] bg-blue-50 text-blue-500 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
                        Progress: {u.progress}%
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="prose prose-sm max-w-none text-gray-700 break-spaces">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="whitespace-pre-line mb-4" {...props} />
                    ),
                  }}
                >
                  {project.message || "No updates yet."}
                </ReactMarkdown>

                {/* <p className="text-sm text-gray-400 text-center py-4">
                    {project.message || "No updates yet."}
                  </p> */}
              </div>
            )}
          </div>
        </div>

        {/* ══════════ RIGHT COLUMN ══════════ */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {/* Access Info */}
          <div className="bg-[#1e293b] text-white p-5 rounded-3xl shadow-lg">
            <h3 className="font-bold mb-4 border-b border-gray-700 pb-2 text-sm">
              Access Info
            </h3>
            <div className="space-y-3 text-xs">
              <CopyRow
                label="Domain"
                value={project.accessInfo?.domain}
                k="domain"
                copied={copied}
                copy={copy}
              />
              <CopyRow
                label="Hosting"
                value={project.accessInfo?.hosting}
                k="hosting"
                copied={copied}
                copy={copy}
              />
              <CopyRow
                label="WP Admin User"
                value={project.accessInfo?.wpAdminUser}
                k="wpUser"
                copied={copied}
                copy={copy}
              />

              {/* WP Pass */}
              <div>
                <p className="text-gray-400 mb-1">WP Admin Pass</p>
                <div className="flex justify-between bg-gray-800 p-2 rounded items-center gap-2">
                  <span className="truncate">
                    {showPass
                      ? project.accessInfo?.wpAdminPass || "—"
                      : "••••••••"}
                  </span>
                  <div className="flex gap-2 shrink-0">
                    {showPass ? (
                      <FaEyeSlash
                        onClick={() => setShowPass(false)}
                        className="cursor-pointer hover:text-blue-300"
                      />
                    ) : (
                      <FaEye
                        onClick={() => setShowPass(true)}
                        className="cursor-pointer hover:text-blue-300"
                      />
                    )}
                    <FaCopy
                      onClick={() =>
                        copy(project.accessInfo?.wpAdminPass, "wpPass")
                      }
                      className={`cursor-pointer ${
                        copied === "wpPass"
                          ? "text-green-400"
                          : "hover:text-blue-300"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {project.accessInfo?.hostingUser && (
                <CopyRow
                  label="Hosting User"
                  value={project.accessInfo.hostingUser}
                  k="hostUser"
                  copied={copied}
                  copy={copy}
                />
              )}
              {project.accessInfo?.hostingPass && (
                <div>
                  <p className="text-gray-400 mb-1">Hosting Pass</p>
                  <div className="flex justify-between bg-gray-800 p-2 rounded items-center gap-2">
                    <span>
                      {showHostPass
                        ? project.accessInfo.hostingPass
                        : "••••••••"}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      {showHostPass ? (
                        <FaEyeSlash
                          onClick={() => setShowHostPass(false)}
                          className="cursor-pointer hover:text-blue-300"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowHostPass(true)}
                          className="cursor-pointer hover:text-blue-300"
                        />
                      )}
                      <FaCopy
                        onClick={() =>
                          copy(project.accessInfo.hostingPass, "hostPass")
                        }
                        className={`cursor-pointer ${
                          copied === "hostPass"
                            ? "text-green-400"
                            : "hover:text-blue-300"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          {project.activityTimeline?.length > 0 && (
            <Card title="Activity Timeline">
              <ul className="steps steps-vertical text-sm">
                {project.activityTimeline.map((step) => (
                  <li
                    key={step.id}
                    className={`step ${
                      step.status === "completed" ? "step-primary" : ""
                    } text-xs font-medium`}
                  >
                    <div className="text-left ml-2">
                      <p className="font-bold text-gray-800">{step.title}</p>
                      <p className="text-[10px] text-gray-400 capitalize">
                        {step.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* ── Live Chat Button ── */}
          <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-sm">
            <FaComments size={18} />
            <span>Open Live Chat</span>
            <span className="flex gap-0.5 items-end ml-1">
              <span
                className="w-1 h-2 bg-white/60 rounded-sm animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1 h-3 bg-white/80 rounded-sm animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1 h-2 bg-white/60 rounded-sm animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </span>
          </button>

          <button className="btn btn-error btn-block text-white rounded-2xl">
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable UI helpers ─────────────────────────── */

function Card({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-700 mb-4 border-b pb-2 text-sm">
        {title}
      </h3>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <p className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <b className="text-gray-800">{value || "—"}</b>
    </p>
  );
}

function CopyRow({ label, value, k, copied, copy }) {
  return (
    <div>
      <p className="text-gray-400 mb-1">{label}</p>
      <div className="flex justify-between bg-gray-800 p-2 rounded items-center gap-2">
        <span className="truncate">{value || "—"}</span>
        <FaCopy
          onClick={() => copy(value, k)}
          className={`cursor-pointer shrink-0 ${
            copied === k ? "text-green-400" : "hover:text-blue-300"
          }`}
        />
      </div>
    </div>
  );
}
