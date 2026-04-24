import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock, LogIn, LogOut, CheckCircle, List, Calendar as CalIcon } from "lucide-react";

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  
  // ডাইনামিক অ্যাটেনডেন্স ডেটা
  const [attendanceData, setAttendanceData] = useState({
    "2026-04-15": { status: "Present", checkIn: "09:05 AM", checkOut: "05:30 PM" },
    "2026-04-16": { status: "Late", checkIn: "10:15 AM", checkOut: "06:00 PM" },
    "2026-04-17": { status: "Absent", checkIn: "-", checkOut: "-" },
    "2026-04-18": { status: "Offday", checkIn: "-", checkOut: "-" },
  });

  const todayKey = new Date().toISOString().split("T")[0];

  // স্ট্যাটিসটিকস ক্যালকুলেশন
  const stats = Object.values(attendanceData).reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] + 1 || 0);
    return acc;
  }, { Present: 0, Late: 0, Absent: 0 });

  // চেক-ইন ফাংশন
  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = { 
      status: "Present", 
      checkIn: time, 
      checkOut: "Pending"
    };
    setAttendanceData({ ...attendanceData, [todayKey]: newEntry });
  };

  // চেক-আউট ফাংশন
  const handleCheckOut = () => {
    if (!attendanceData[todayKey] || attendanceData[todayKey].checkIn === "-") {
      alert("আগে চেক-ইন করুন!");
      return;
    }
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAttendanceData({
      ...attendanceData,
      [todayKey]: { ...attendanceData[todayKey], checkOut: time }
    });
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const data = attendanceData[dateString];
      if (data) {
        let style = "bg-gray-100 text-gray-500";
        if (data.status === "Present") style = "bg-green-100 text-green-600";
        if (data.status === "Late") style = "bg-orange-100 text-orange-600";
        if (data.status === "Absent") style = "bg-red-100 text-red-600";
        return <div className={`mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${style}`}>{data.status}</div>;
      }
      return <div className="mt-2 w-4 h-1 bg-gray-100 rounded-full mx-auto"></div>;
    }
  };

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen font-sans">
      
      {/* Header Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-600 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">April 2026</h2>
          <p className="text-sm text-gray-400">Live Attendance Tracking</p>
        </div>
        <div className="flex gap-8 text-right">
          {Object.entries(stats).map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{label}</p>
              <p className={`text-xl font-bold ${label === 'Present' ? 'text-green-500' : label === 'Late' ? 'text-orange-500' : 'text-red-500'}`}>
                {value < 10 ? `0${value}` : value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Calendar */}
        <div className="lg:col-span-7 bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-fit">
          <Calendar onChange={setDate} value={date} tileContent={renderTileContent} className="w-full border-none" />
        </div>

        {/* Right: Actions & Activity */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Daily Action Buttons */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" /> Daily Action
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleCheckIn}
                disabled={attendanceData[todayKey]?.checkIn && attendanceData[todayKey].checkIn !== "-"}
                className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400 transition hover:bg-green-700"
              >
                <LogIn size={18} /> Check In
              </button>
              <button 
                onClick={handleCheckOut}
                disabled={attendanceData[todayKey]?.checkOut && attendanceData[todayKey].checkOut !== "Pending"}
                className="flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400 transition hover:bg-red-700"
              >
                <LogOut size={18} /> Check Out
              </button>
            </div>
          </div>

          {/* Activity Log - 2 Column Layout */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
            <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
              <List size={18} className="text-orange-500" /> Recent Activity
            </h3>
            
            <div className="space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b pb-2 px-2">
                <span>Date</span>
                <span className="text-center">Check In</span>
                <span className="text-right">Check Out</span>
              </div>

              {/* Activity List */}
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                {Object.entries(attendanceData).reverse().map(([dateStr, details]) => (
                  <div key={dateStr} className="grid grid-cols-3 items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                    {/* Date Column */}
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-50 rounded-md text-indigo-600">
                        <CalIcon size={12} />
                      </div>
                      <span className="text-[11px] font-bold text-gray-700">{dateStr.split('-').reverse().join('/')}</span>
                    </div>

                    {/* Check-In Column */}
                    <div className="text-center">
                      <span className={`text-[11px] font-medium px-2 py-1 rounded ${details.checkIn !== '-' ? 'text-green-600 bg-green-50' : 'text-gray-400'}`}>
                        {details.checkIn}
                      </span>
                    </div>

                    {/* Check-Out Column */}
                    <div className="text-right">
                      <span className={`text-[11px] font-medium px-2 py-1 rounded ${details.checkOut !== '-' && details.checkOut !== 'Pending' ? 'text-red-600 bg-red-50' : details.checkOut === 'Pending' ? 'text-orange-500 bg-orange-50' : 'text-gray-400'}`}>
                        {details.checkOut}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx="true">{`
        .react-calendar { width: 100% !important; border: none !important; }
        .react-calendar__month-view__weekdays { background-color: #f8fafc; border-radius: 8px; margin-bottom: 10px; padding: 10px 0; }
        .react-calendar__month-view__weekdays__weekday abbr { text-decoration: none; font-weight: 700; color: #475569; }
        .react-calendar__tile { height: 90px !important; display: flex; flex-direction: column; align-items: center; padding-top: 10px !important; border: 0.5px solid #f8fafc !important; }
        .react-calendar__tile abbr { font-size: 0.95rem; font-weight: 600; color: #334155; }
        .react-calendar__tile--active { background: #f1f5f9 !important; border-radius: 10px; }
        .react-calendar__tile--now { background: transparent !important; }
        .react-calendar__tile--now abbr { color: #3b82f6; border-bottom: 2px solid #3b82f6; }
      `}</style>
    </div>
  );
};

export default Attendance;