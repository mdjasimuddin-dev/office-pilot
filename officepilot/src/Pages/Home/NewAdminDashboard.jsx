import { motion } from "framer-motion";
import { 
  FaUsers, FaChartLine, FaBoxArchive, FaWallet, 
  FaCircleCheck, FaClockRotateLeft, FaBriefcase, FaBan 
} from "react-icons/fa6";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Professional English Dataset
const dashboardData = {
  stats: [
    { label: "Total Employees", value: "48", icon: <FaUsers />, color: "from-blue-500 to-blue-700" },
    { label: "Total Sales", value: "$12,500", icon: <FaChartLine />, color: "from-emerald-500 to-emerald-700" },
    { label: "Delivery Done", value: "32", icon: <FaCircleCheck />, color: "from-purple-500 to-purple-700" },
    { label: "Total Due", value: "$2,400", icon: <FaWallet />, color: "from-rose-500 to-rose-700" },
  ],
  companyGoal: { percentage: 72, target: "$15,000", achievement: "$10,800" },
  departments: [
    { label: "CMS", count: 12, color: "bg-orange-50", text: "text-orange-600" },
    { label: "MERN", count: 8, color: "bg-blue-50", text: "text-blue-600" },
    { label: "PHP", count: 5, color: "bg-indigo-50", text: "text-indigo-600" },
    { label: "Python", count: 3, color: "bg-yellow-50", text: "text-yellow-600" },
    { label: "Marketing", count: 15, color: "bg-green-50", text: "text-green-600" },
    { label: "Cancelled", count: 2, color: "bg-red-50", text: "text-red-600" },
  ],
  performance: [
    { name: "MERN Stack", target: "$5k", sale: "$4.2k", delivery: 5, due: "$800", expense: "$1.2k" },
    { name: "Digital Marketing", target: "$3k", sale: "$3.5k", delivery: 12, due: "$0", expense: "$950" },
  ],
  attendance: [
    { name: "Jasim Uddin", in: "09:00 AM", out: "06:00 PM", hours: "9h", status: "Present", img: "https://i.pravatar.cc/150?u=1" },
    { name: "Rahim Ali", in: "10:15 AM", out: "07:00 PM", hours: "8.5h", status: "Late", img: "https://i.pravatar.cc/150?u=2" },
  ]
};

export default function NewAdminDashboard() {
  const data = dashboardData;

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-[#1e293b]">
      
      {/* 1. Gradient Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {data.stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-between group"
          >
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.color}`} />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h2 className="text-2xl font-black text-slate-800">{stat.value}</h2>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform text-slate-400 text-xl">
               {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* 2. Company Achievement (Circular) */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 flex flex-col items-center">
          <h3 className="font-black text-lg mb-8 tracking-tight uppercase text-slate-500 text-sm">Monthly Revenue Goal</h3>
          <div className="w-44 h-44 relative">
            <CircularProgressbar 
              value={data.companyGoal.percentage} 
              text={`${data.companyGoal.percentage}%`} 
              strokeWidth={10}
              styles={buildStyles({
                pathColor: '#FE7F2D',
                textColor: '#1e293b',
                trailColor: '#f1f5f9',
                strokeLinecap: 'round'
              })} 
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Target</p>
              <p className="font-black text-slate-700">{data.companyGoal.target}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-[10px] font-bold text-orange-400 uppercase">Reached</p>
              <p className="font-black text-orange-700">{data.companyGoal.achievement}</p>
            </div>
          </div>
        </div>

        {/* 3. Departmental Projects */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-lg tracking-tight">Active Projects</h3>
            <button className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-4 py-2 rounded-xl">View Detailed Report</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.departments.map((dept, idx) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                key={idx} 
                className={`${dept.color} p-5 rounded-3xl border border-white shadow-sm flex flex-col justify-center`}
              >
                <p className={`text-3xl font-black ${dept.text}`}>{dept.count}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{dept.label}</p>
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
                <th className="px-8 py-5">Deliveries</th>
                <th className="px-8 py-5">Expenditure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.performance.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5 font-black text-slate-700">{row.name}</td>
                  <td className="px-8 py-5 font-bold text-slate-500">{row.target}</td>
                  <td className="px-8 py-5 font-black text-emerald-600">{row.sale}</td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold text-[10px] uppercase">{row.delivery} Units</span>
                  </td>
                  <td className="px-8 py-5 font-black text-rose-500">{row.expense}</td>
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
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-4">
                    <img src={user.img} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm" alt={user.name} />
                    <div>
                      <p className="font-black text-sm text-slate-700">{user.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{user.in} - {user.out}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs font-black text-slate-600 mb-1">{user.hours}</p>
                    <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase ${user.status === 'Present' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
         </div>

         <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mt-24 blur-3xl transition-all group-hover:bg-orange-500/20" />
            <h3 className="font-black text-lg mb-8 relative z-10 uppercase tracking-widest text-slate-400 text-sm">Leave Management</h3>
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
      <p className="text-[9px] font-black text-slate-400 uppercase mt-2 tracking-widest">{label}</p>
    </div>
  );
}