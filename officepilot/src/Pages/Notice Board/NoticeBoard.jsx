import React, { useState } from "react";
import { Bell, Megaphone, History, MessageSquare, CheckCircle, XCircle, Send, Pin, Calendar as CalIcon, Clock } from "lucide-react";

const NoticeBoard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ডামি নোটিশ ডেটা (অ্যাডমিন থেকে আসা)
  const notices = [
    { id: 1, title: "পবিত্র ঈদুল ফিতর উপলক্ষ্যে ছুটির নোটিশ", date: "2026-04-18", category: "Holiday", content: "পবিত্র ঈদুল ফিতর উপলক্ষ্যে ১৭ মার্চ থেকে ২৩ মার্চ, ২০২৬ পর্যন্ত (মোট ৭ দিন) সরকারি ছুটি ঘোষণা করা হলো। এই সময়কালে সকল অফিস, শাখা ও শিক্ষাপ্রতিষ্ঠান বন্ধ থাকবে। কোনো জরুরি কাজের জন্য ইমেইল/ফোনের মাধ্যমে যোগাযোগ করুন। ঈদের পর ২৪ মার্চ, ২০২৬ (মঙ্গলবার) থেকে স্বাভাবিক কার্যক্রম শুরু হবে। সকল কর্মীদের পবিত্র ঈদমোবারক! সুস্থ থাকুন, নিরাপদে বাড়ি ফেরেন।", isPinned: true },
    { id: 2, title: "New Attendance Policy", date: "2026-04-15", category: "Policy", content: "Check-in time is strictly 09:00 AM from next month.", isPinned: false },
    { id: 3, title: "Office Renovation", date: "2026-04-10", category: "General", content: "The 3rd floor will be under renovation this weekend.", isPinned: false },
  ];

  // ইউজারের করা নোটিশ রিকোয়েস্ট বা পরামর্শ
  const myRequests = [
    { id: 101, title: "Request for Water Filter Change", date: "2026-04-19", status: "Approved", feedback: "Maintenance team is informed." },
    { id: 102, title: "Proposal for Game Zone", date: "2026-04-16", status: "Pending", feedback: "Under review by HR." },
    { id: 103, title: "AC Maintenance Request", date: "2026-04-12", status: "Rejected", feedback: "Already serviced last week." },
  ];

  const filteredRequests = activeTab === "all" 
    ? myRequests 
    : myRequests.filter(item => item.status.toLowerCase() === activeTab);

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen font-sans">
      
      {/* --- Header --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-orange-500 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Notice Board</h2>
          <p className="text-sm text-gray-400">Stay updated with latest announcements</p>
        </div>
        <Megaphone size={32} className="text-orange-500 opacity-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- Left Column: Latest & All Notices --- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Highlighted/Pinned Notices */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
              <Pin size={16} className="text-red-500" /> Featured Notices
            </h3>
            {notices.filter(n => n.isPinned).map(notice => (
              <div key={notice.id} className="bg-gradient-to-r from-orange-50 to-white p-5 rounded-xl border-l-4 border-orange-500 shadow-sm relative overflow-hidden">
                <div className="absolute right-[-10px] top-[-10px] opacity-5">
                  <Bell size={80} />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded uppercase">
                    {notice.category}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <CalIcon size={12} /> {notice.date}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">{notice.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
              </div>
            ))}
          </div>

          {/* Regular/Old Notices */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
              <History size={18} className="text-indigo-500" /> General Announcements
            </h3>
            <div className="divide-y divide-gray-100">
              {notices.filter(n => !n.isPinned).map(notice => (
                <div key={notice.id} className="py-4 first:pt-0 last:pb-0 group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition cursor-pointer">{notice.title}</h5>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{notice.content}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-4">{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Column: Request/Suggestion Form & Status --- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Suggestion Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-green-600" /> Suggest a Notice
            </h3>
            <form className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Subject</label>
                <input type="text" placeholder="What's this about?" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Details</label>
                <textarea rows="3" placeholder="Explain your suggestion..." className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-500"></textarea>
              </div>
              <button type="button" className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition">
                <Send size={14} /> Send Request
              </button>
            </form>
          </div>

          {/* Request Status List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase">My Requests</h3>
              <div className="flex bg-gray-100 p-0.5 rounded-md">
                {["all", "pending"].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`px-2 py-1 text-[9px] font-bold capitalize rounded ${activeTab === t ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredRequests.map(req => (
                <div key={req.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <h6 className="text-xs font-bold text-slate-700 truncate w-4/5">{req.title}</h6>
                    {req.status === "Approved" ? <CheckCircle size={14} className="text-green-500" /> : 
                     req.status === "Rejected" ? <XCircle size={14} className="text-red-500" /> : 
                     <Clock size={14} className="text-orange-400" />}
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">{req.date}</p>
                  <div className={`text-[10px] p-2 rounded ${req.status === 'Approved' ? 'bg-green-50 text-green-700' : req.status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`}>
                    <strong>Feedback:</strong> {req.feedback}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default NoticeBoard;