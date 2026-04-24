import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function AutoActiveTimeline() {
  // শুরুতে কিছু স্টেপ ডিফল্টভাবে 'completed' বা একটিভ রাখা হয়েছে
  const [steps, setSteps] = useState([
    { id: 1, title: "App Structure", status: "completed" },
    { id: 2, title: "UI Implementation", status: "completed" },
  ]);

  const [newStepTitle, setNewStepTitle] = useState("");

  // নতুন মাইলস্টোন যোগ করার ফাংশন
  const addNewStep = () => {
    if (newStepTitle.trim() === "") return;

    const newStep = {
      id: steps.length + 1, // অটোমেটিক পরবর্তী নাম্বার
      title: newStepTitle,
      status: "completed", // এখানে 'completed' দেওয়া হয়েছে যাতে অ্যাড হওয়ার সাথেই একটিভ হয়
    };

    setSteps([...steps, newStep]);
    setNewStepTitle("");
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
      <h3 className="text-gray-800 font-bold text-lg mb-8 tracking-tight">Activity Timeline</h3>

      {/* Timeline List */}
      <div className="relative space-y-0 mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start">
            
            {/* কানেক্টিং লাইন (Connecting Line) */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-[19px] top-10 w-[4px] h-full -z-0 transition-colors duration-500 ${
                  step.status === "completed" && steps[index + 1]?.status === "completed"
                    ? "bg-[#5D3FD3]" // একটিভ থাকলে বেগুনি
                    : "bg-gray-100"
                }`}
              ></div>
            )}

            {/* নাম্বার ইন্ডিকেটর (Status Indicator) */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-500 shadow-lg ${
                  step.status === "completed"
                    ? "bg-[#5D3FD3] text-white shadow-purple-100"
                    : "bg-white border-2 border-gray-100 text-gray-300"
                }`}
              >
                {step.id}
              </div>
            </div>

            {/* টেক্সট কন্টেন্ট */}
            <div className="ml-6 pb-10 pt-2">
              <p className={`font-black text-[13px] tracking-tight transition-all duration-500 ${
                  step.status === "completed" ? "text-gray-800" : "text-gray-400"
                }`}>
                {step.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Live Update
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field Section */}
      <div className="mt-2">
        <div className="relative flex items-center group">
          <input
            type="text"
            value={newStepTitle}
            onChange={(e) => setNewStepTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewStep()}
            placeholder="Add new project step..."
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-5 pr-14 text-xs font-bold focus:bg-white focus:border-purple-100 focus:ring-0 transition-all placeholder:text-gray-300"
          />
          <button
            onClick={addNewStep}
            className="absolute right-2 p-2.5 bg-gray-900 text-white rounded-xl hover:bg-[#5D3FD3] transition-all active:scale-95 shadow-lg flex items-center justify-center"
          >
            <FaPlus size={12} />
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-3 font-bold uppercase tracking-tighter opacity-60">
          Newly added steps are activated automatically
        </p>
      </div>
    </div>
  );
}