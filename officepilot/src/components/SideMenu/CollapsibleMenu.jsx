import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const CollapsibleMenu = ({ icon: Icon, label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen= ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <div 
      className="relative"
      // onMouseEnter={() => setIsOpen(true)} // হোভার করলে খুলবে
      // onMouseLeave={() => setIsOpen(false)} // মাউস সরালে বন্ধ হবে
      onClick={handleOpen}
    >
      <button
        onClick={() => setIsOpen(!isOpen)} // ক্লিক করলে টগল হবে
        className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 group ${
          isOpen ? "bg-white/10 text-white" : "text-[#919EAB] hover:text-white hover:bg-white/5"
        }`}
      >
        <div className="flex items-center gap-x-3">
          <Icon className="text-xl" />
          <span className="font-medium text-[15px]">{label}</span>
        </div>
        <FaAngleDown className={`text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* সাব-মেনু এনিমেশন */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden ml-9 mt-1 flex flex-col gap-y-1 border-l border-gray-700/50"
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};