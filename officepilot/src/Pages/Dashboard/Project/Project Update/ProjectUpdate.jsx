import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaRocket, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/AxiosSecure";
import axios from "axios";

/* ─── Status options ─────────── */
const STATUS_OPTIONS = [
  { value: "in-progress", label: "In Progress",  color: "bg-blue-50 text-blue-600 border-blue-200" },
  { value: "review",      label: "Under Review", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { value: "blocked",     label: "Blocked",      color: "bg-red-50 text-red-600 border-red-200" },
  { value: "done",        label: "Done",         color: "bg-green-50 text-green-600 border-green-200" },
];

/* ─── Hardcoded current user — পরে auth থেকে আসবে ── */
const CURRENT_USER = { name: "Ariful Islam", role: "member" };

export default function ProjectUpdate() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [project, setProject]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    message:  "",
    progress: "",
    status:   "in-progress",
    tasks:    [""],
  });

  useEffect(() => {
    if (!id) return;
    axiosSecure.get(`/project/${id}`)
      .then(res => setProject(res.data.data))
      .catch(err => console.error(err));
  }, [id]);


  console.log("project Data: ", project)

  const handleTaskChange = (i, val) => {
    setForm(prev => {
      const tasks = [...prev.tasks];
      tasks[i] = val;
      return { ...prev, tasks };
    });
  };

  const addTask = () => setForm(prev => ({ ...prev, tasks: [...prev.tasks, ""] }));
  const removeTask = (i) => setForm(prev => ({
    ...prev,
    tasks: prev.tasks.filter((_, idx) => idx !== i),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;

    setLoading(true);
    const payload = {
      message:  form.message,
      progress: form.progress !== "" ? Number(form.progress) : undefined,
      status:   form.status,
      tasks:    form.tasks.filter(t => t.trim() !== ""),
      Author:   CURRENT_USER.name,
      date:     new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.patch(`/update-project/${id}`, payload);
      console.log("Project updated: ", res.data.data)
      setSubmitted(true);
      setTimeout(() => navigate(`http://localhost:3000/project-details/${id}`), 1800);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
      <FaCheckCircle size={52} className="text-green-500" />
      <h2 className="text-xl font-bold text-gray-700">Update Shared!</h2>
      <p className="text-sm text-gray-400">Redirecting to project...</p>
    </div>
  );

  return (
    <div className="p-8 bg-[#F8F9FB] min-h-screen font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <FaArrowLeft className="text-gray-500" />
          </button>
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
            <MdMessage size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800">Share Update</h1>
            {project && (
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-0.5">
                {project.projectName} · {project.projectId}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Update Message */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              What did you work on today? *
            </label>
            <textarea
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              rows={10}
              required
              placeholder="Describe what you accomplished today, any blockers, or next steps..."
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-200 outline-none resize-none placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>

          {/* Task Checklist */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Today's Tasks
              </label>
              <button
                type="button"
                onClick={addTask}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                + Add task
              </button>
            </div>
            <div className="space-y-2">
              {form.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-300 text-xs font-bold w-4">{i + 1}.</span>
                  <input
                    type="text"
                    value={task}
                    onChange={e => handleTaskChange(i, e.target.value)}
                    placeholder={`Task ${i + 1}`}
                    className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-gray-300 placeholder:font-normal"
                  />
                  {form.tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(i)}
                      className="text-gray-300 hover:text-red-400 text-xs font-bold transition-colors px-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress & Status */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Progress Update (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0" max="100" step="5"
                  value={form.progress || 0}
                  onChange={e => setForm(prev => ({ ...prev, progress: e.target.value }))}
                  className="flex-1 accent-blue-500"
                />
                <span className="text-sm font-black text-blue-600 w-10 text-right">
                  {form.progress || 0}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 mt-2 overflow-hidden">
                <div
                  style={{ width: `${form.progress || 0}%` }}
                  className="h-full bg-blue-500 transition-all duration-300 rounded-full"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Current Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, status: opt.value }))}
                    className={`text-xs font-bold py-2 px-3 rounded-xl border-2 transition-all ${
                      form.status === opt.value
                        ? opt.color + " border-current"
                        : "bg-gray-50 text-gray-400 border-transparent hover:border-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !form.message.trim()}
            className="w-full bg-blue-600 disabled:bg-gray-300 text-white py-4 rounded-3xl font-black text-base shadow-xl hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <FaRocket />
            {loading ? "Sending..." : "Submit Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
