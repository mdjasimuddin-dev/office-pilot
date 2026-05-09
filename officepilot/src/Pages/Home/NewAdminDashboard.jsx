import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaBoxArchive,
  FaWallet,
  FaCircleCheck,
  FaClockRotateLeft,
  FaBriefcase,
  FaBan,
} from "react-icons/fa6";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { use } from "react";
import { useMemo } from "react";

// Professional English Dataset
const dashboardData = {
  companyGoal: { percentage: 72, target: "$15,000", achievement: "$10,800" },
  attendance: [
    {
      name: "Jasim Uddin",
      in: "09:00 AM",
      out: "06:00 PM",
      hours: "9h",
      status: "Present",
      img: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Rahim Ali",
      in: "10:15 AM",
      out: "07:00 PM",
      hours: "8.5h",
      status: "Late",
      img: "https://i.pravatar.cc/150?u=2",
    },
  ],
};

export default function NewAdminDashboard() {
  const data = dashboardData;
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);

  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/departments`)
      .then((res) => {
        console.log("Department Data:", res.data);
        setDepartments(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [axiosSecure]);

  const totalStats = departments.reduce(
    (acc, curr) => {
      acc.totalTarget += curr.target | 0;
      acc.totalSale += curr.currentSale || 0;
      acc.totalAchieved += curr.achievedAmount || 0;
      acc.totalDue += curr.totalDue || 0;
      acc.totalExpense += curr.fixedExpense || 0;
      return acc;
    },
    {
      totalTarget: 0,
      totalSale: 0,
      totalAchieved: 0,
      totalDue: 0,
      totalExpense: 0,
    },
  );

  // কোম্পানির সার্বিক অর্জনের পার্সেন্টেজ বের করতে চাইলে:
  const totalAchievedPercentage =
    totalStats.totalTarget > 0
      ? ((totalStats.totalSale / totalStats.totalTarget) * 100).toFixed(2)
      : 0;

  console.log("Company Overview:", totalStats);
  console.log("Total Achievement Percentage:", totalAchievedPercentage + "%");

  console.log("Get All Department Data", departments);

  useEffect(() => {
    axiosSecure
      .get(`/employees`)
      .then((res) => {
        console.log("Employees Data:", res.data);
        setEmployees(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get(`/projects`)
      .then((res) => {
        console.log("Project Data:", res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [axiosSecure]);

  const departmentCount = useMemo(() => {
    const countData = {};

    projects.forEach((project) => {
      const departmentName = project.department || "others";
      countData[departmentName] = (countData[departmentName] || 0) + 1;
    });

    return Object.entries(countData).map(([name, count]) => ({
      name: name,
      count: count,
    }));
  }, [projects]);

  console.log("Employee Get:", employees.length);
  console.log("Project Get:", projects);

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-[#1e293b]">
      {/* 1. Gradient Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Employee  */}
        <div className="relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-between group">
          <div
            className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-blue-700`}
          />
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Total Employee
            </p>
            <h2 className="text-2xl font-black text-slate-800">
              {employees?.length}
            </h2>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform text-slate-400 text-xl">
            <FaUsers />
          </div>
        </div>

        {/* Total Sales  */}
        <div className="relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-between group">
          <div
            className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-emerald-700`}
          />
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Total Sales
            </p>
            <h2 className="text-2xl font-black text-slate-800">${totalStats.totalSale}</h2>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform text-slate-400 text-xl">
            <FaChartLine />
          </div>
        </div>

        {/* Total Delivery Done  */}
        <div className="relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-between group">
          <div
            className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-purple-700`}
          />
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Delivery Done
            </p>
            <h2 className="text-2xl font-black text-slate-800">${totalStats.totalAchieved}</h2>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform text-slate-400 text-xl">
            <FaCircleCheck />
          </div>
        </div>

        {/* Total Due  */}
        <div className="relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-between group">
          <div
            className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-500 to-rose-700`}
          />
          <div className="">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Total Due
            </p>
            <h2 className="text-2xl font-black text-slate-800">${totalStats.totalDue}</h2>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform text-slate-400 text-xl">
            <FaWallet />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* 2. Company Achievement (Circular) */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 flex flex-col items-center">
          <h3 className="font-black text-lg mb-8 tracking-tight uppercase text-slate-500 text-sm">
            Monthly Revenue Goal
          </h3>
          <div className="w-44 h-44 relative">
            <CircularProgressbar
              value={totalAchievedPercentage}
              text={`${totalAchievedPercentage}%`}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#FE7F2D",
                textColor: "#1e293b",
                trailColor: "#f1f5f9",
                strokeLinecap: "round",
              })}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Target
              </p>
              <p className="font-black text-slate-700">
                ${totalStats.totalTarget}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-[10px] font-bold text-orange-400 uppercase">
                Reached
              </p>
              <p className="font-black text-orange-700">
                ${totalStats.totalAchieved}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Departmental Projects */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-lg tracking-tight">
              Active Projects
            </h3>
            <button className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-4 py-2 rounded-xl">
              View Detailed Report
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {departmentCount.map((dept, idx) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={idx}
                className={`${
                  dept.name == "MERN"
                    ? "bg-green-100"
                    : dept.name == "Shopify"
                    ? "bg-blue-100"
                    : dept.name == "Wordpress"
                    ? "bg-orange-100"
                    : dept.name == "PHP"
                    ? "bg-red-100"
                    : dept.name == "Python"
                    ? "bg-indigo-100"
                    : ""
                } p-5 rounded-3xl border border-white shadow-sm flex flex-col justify-center`}
              >
                <p
                  className={`text-3xl font-black ${
                    dept.name == "MERN"
                      ? "text-green-600"
                      : dept.name == "Shopify"
                      ? "text-blue-600"
                      : dept.name == "Wordpress"
                      ? "text-orange-600"
                      : dept.name == "PHP"
                      ? "text-red-600"
                      : dept.name == "Python"
                      ? "text-indigo-600"
                      : ""
                  }`}
                >
                  {dept.count}
                </p>
                <p
                  className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1`}
                >
                  {dept.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Performance Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden mb-10 border border-slate-100">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="font-black text-lg">Departmental Sales & Expenses</h3>
          <FaBoxArchive className="text-slate-300" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-[2px]">
              <tr>
                <th className="px-8 py-5">Department</th>
                <th className="px-8 py-5">Target</th>
                <th className="px-8 py-5">Net Sales</th>
                <th className="px-8 py-5">Achivement</th>
                <th className="px-8 py-5">Performance</th>
                <th className="px-8 py-5">Expenditure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {departments.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5 font-black text-slate-700">
                    {row.departmentName}
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-500">
                    ${row.target}
                  </td>
                  <td className="px-8 py-5 font-black text-emerald-600">
                    ${row.currentSale}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold text-[10px] uppercase">
                      ${row.achievedAmount}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold text-[10px] uppercase">
                      {row.achievedPercentage} %
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-rose-500">
                    ${row.fixedExpense}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Attendance & Leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white">
          <h3 className="font-black text-lg mb-6">Daily Attendance</h3>
          <div className="space-y-4">
            {data.attendance.map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.img}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                    alt={user.name}
                  />
                  <div>
                    <p className="font-black text-sm text-slate-700">
                      {user.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {user.in} - {user.out}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs font-black text-slate-600 mb-1">
                    {user.hours}
                  </p>
                  <span
                    className={`text-[9px] px-3 py-1 rounded-full font-black uppercase ${
                      user.status === "Present"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#2b3854] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mt-24 blur-3xl transition-all group-hover:bg-orange-500/20" />
          <h3 className="font-black text-lg mb-8 relative z-10 uppercase tracking-widest text-slate-400 text-sm">
            Leave Management
          </h3>
          <div className="grid grid-cols-3 gap-4 relative z-10">
            <LeaveStat value="05" label="Pending" color="text-orange-500" />
            <LeaveStat value="12" label="Approved" color="text-emerald-500" />
            <LeaveStat value="02" label="Rejected" color="text-rose-500" />
          </div>
          <button className="w-full mt-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-black text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95">
            Review All Requests
          </button>
        </div>
      </div>
    </div>
  );
}

function LeaveStat({ value, label, color }) {
  return (
    <div className="text-center p-6 bg-white/5 rounded-[2rem] backdrop-blur-md border border-white/10">
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      <p className="text-[9px] font-black text-slate-400 uppercase mt-2 tracking-widest">
        {label}
      </p>
    </div>
  );
}
