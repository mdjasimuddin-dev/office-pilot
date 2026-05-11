// import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/AxiosSecure";
// import useAuth from "../../../Hooks/useAuth";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  // const canAddOrDelete = role === "admin" || role === "leader";

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axiosSecure
      .get("/projects")
      .then((res) => {
        console.log("All project data get", res);
        setProjects(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const getCountdownText = (deadline) => {
    const target = new Date(deadline);
    const difference = target - currentTime;

    if (difference <= 0)
      return <span className="text-red-500 font-bold">Late </span>;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return (
      <span
        className={`font-mono ${days < 3 ? "text-red-500" : "text-green-600"}`}
      >
        {days}d : {hours}h : {minutes}m : {seconds}s
      </span>
    );
  };

  return (
    <div className="m-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold italic underline decoration-orange-500">
          Project Management
        </h1>

        <Link
          to="/add-project"
          className="btn btn-primary bg-orange-600 border-none text-white hover:bg-orange-700"
        >
          + Add New Project
        </Link>
      </div>

      <div className="p-6 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-white border border-gray-100">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="text-sm uppercase tracking-wider">
                <th>SL</th>
                <th>Project Details</th>
                <th>Budget</th>
                <th>Assignee</th>
                <th className="min-w-[150px]">Time Left</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project._id || index}
                  className="hover:bg-blue-50/50 transition-all border-b border-gray-100 w-full"
                >
                  <td
                    onClick={() => navigate(`admin/project-details/${project._id}`)}
                    className="font-bold cursor-pointer text-gray-400"
                  >
                    {project.projectId}
                  </td>
                  <td
                    onClick={() => navigate(`/admin/project-details/${project._id}`)}
                    className="font-semibold cursor-pointer text-gray-800"
                  >
                    {project.clientInfo.name}
                  </td>

                  <td className="font-medium text-green-700 font-mono">
                    ${project.budget.amount}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                        {project?.assignWork?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm text-gray-600">
                        {project?.assignWork || "Unassign"}
                      </span>
                    </div>
                  </td>

                  <td>{getCountdownText(project.deadline)}</td>

                  <td>
                    <div
                      className="radial-progress text-blue-600 bg-blue-50 border-4 border-blue-50 shadow-inner"
                      style={{
                        "--value": project.progress,
                        "--size": "2.8rem",
                        "--thickness": "3px",
                      }}
                      role="progressbar"
                    >
                      <span className="text-[10px] font-black">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`badge badge-sm p-3 font-bold border-none ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {project.status}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/project-details/${project._id}`)
                        }
                        className="p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/update-project/${project._id}`)
                        }
                        className="p-2 bg-gray-100 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                      >
                        <FaEdit />
                      </button>
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                        <MdDelete />
                      </button>
                    </div>
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
