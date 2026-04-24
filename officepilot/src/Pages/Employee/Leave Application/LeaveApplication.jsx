import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Send, Clock, CheckCircle, XCircle, FileText, Calendar as CalIcon, ChevronDown } from "lucide-react";

const LeaveApplication = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]

  // ডামি লিভ ব্যালেন্স ডেটা
  const leaveBalance = [
    { type: "Sick Leave", total: 10, taken: 2, remaining: 8, color: "text-red-500" },
    { type: "Casual Leave", total: 12, taken: 4, remaining: 8, color: "text-blue-500" },
    { type: "Annual Leave", total: 15, taken: 0, remaining: 15, color: "text-green-500" },
  ];

  // ডামি লিভ হিস্ট্রি ডেটা
  const leaveHistory = [
    { id: 1, type: "Sick Leave", from: "2026-04-10", to: "2026-04-12", days: 2, status: "Approved", reason: "Viral Fever" },
    { id: 2, type: "Casual Leave", from: "2026-04-20", to: "2026-04-21", days: 1, status: "Pending", reason: "Family Program" },
    { id: 3, type: "Annual Leave", from: "2026-05-01", to: "2026-05-05", days: 5, status: "Rejected", reason: "Project Deadline" },
  ];

  const handleDateChange = (value) => {
    setDateRange(value);
    if (value[0] && value[1]) {
      setShowCalendar(false); // রেঞ্জ সিলেক্ট হয়ে গেলে ক্যালেন্ডার বন্ধ হবে
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredHistory = activeTab === "all" 
    ? leaveHistory 
    : leaveHistory.filter(item => item.status.toLowerCase() === activeTab);

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen font-sans">
      
      {/* --- Header --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-600 mb-6">
        <h2 className="text-2xl font-bold text-slate-700">Leave Management</h2>
        <p className="text-sm text-gray-400">Apply for leaves and track your records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- Left Column: Apply Leave Form --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-indigo-600" /> Apply New Leave
            </h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leave Type Select */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Leave Type</label>
                  <div className="relative">
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none appearance-none focus:border-indigo-500">
                      <option>Select Type</option>
                      <option>Sick Leave</option>
                      <option>Casual Leave</option>
                      <option>Annual Leave</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Selection with Calendar Modal */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Date Range</label>
                  <button 
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:border-indigo-500 text-left"
                  >
                    <span>
                      {dateRange[0] ? `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}` : "Select Range"}
                    </span>
                    <CalIcon size={16} className="text-indigo-500" />
                  </button>

                  {/* Absolute Calendar Dropdown */}
                  {showCalendar && (
                    <div className="absolute z-50 mt-2 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 left-0">
                      <Calendar
                        onChange={handleDateChange}
                        value={dateRange}
                        selectRange={true}
                        className="border-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg text-xs font-bold hover:bg-indigo-100"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Reason</label>
                <textarea rows="3" placeholder="Describe your reason here..." className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500"></textarea>
              </div>

              <button type="button" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
                <Send size={18} /> Submit Application
              </button>
            </form>
          </div>
        </div>

        {/* --- Right Column: Leave Balance Table --- */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" /> Leave Balance
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-center">Total</th>
                    <th className="px-4 py-3 text-center">Taken</th>
                    <th className="px-4 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leaveBalance.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className={`px-4 py-3 font-bold ${item.color}`}>{item.type}</td>
                      <td className="px-4 py-3 text-center text-gray-600 font-semibold">{item.total}</td>
                      <td className="px-4 py-3 text-center text-gray-600 font-semibold">{item.taken}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-800">{item.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Bottom: Leave History & Status --- */}
        <div className="lg:col-span-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <Clock size={20} className="text-orange-500" /> Leave History
              </h3>
              <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
                {["all", "pending", "approved", "rejected"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold capitalize transition whitespace-nowrap ${
                      activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredHistory.map((leave) => (
                <div key={leave.id} className="grid grid-cols-1 md:grid-cols-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-200 transition group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-indigo-50">
                      <CalIcon size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{leave.type}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{leave.from} - {leave.to}</p>
                    </div>
                  </div>
                  <div className="text-center hidden md:block border-l border-r border-gray-200 px-2">
                    <p className="text-xs font-bold text-gray-600">{leave.days} Days</p>
                    <p className="text-[10px] text-gray-400">Duration</p>
                  </div>
                  <div className="hidden md:block px-4">
                    <p className="text-xs text-gray-500 italic truncate" title={leave.reason}>"{leave.reason}"</p>
                  </div>
                  <div className="text-right flex justify-end">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      leave.status === "Approved" ? "bg-green-100 text-green-600" :
                      leave.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"
                    }`}>
                      {leave.status === "Approved" ? <CheckCircle size={10} /> : 
                       leave.status === "Pending" ? <Clock size={10} /> : <XCircle size={10} />}
                      {leave.status}
                    </span>
                  </div>
                </div>
              ))}
              {filteredHistory.length === 0 && (
                <p className="text-center py-10 text-gray-400 text-sm italic">No records found.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .react-calendar {
          width: 320px !important;
          border: none !important;
          font-family: inherit !important;
        }
        .react-calendar__tile--active {
          background: #4f46e5 !important;
          border-radius: 8px;
        }
        .react-calendar__tile--range {
          background: #eef2ff !important;
          color: #4f46e5 !important;
        }
        .react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd {
          background: #4f46e5 !important;
          color: white !important;
        }
        .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default LeaveApplication;