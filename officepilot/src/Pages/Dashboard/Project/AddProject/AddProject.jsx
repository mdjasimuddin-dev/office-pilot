import React, { useState } from "react";
import { FaRocket, FaLock } from "react-icons/fa";
import { SiWordpress } from "react-icons/si";
import Swal from "sweetalert2";
import axios from "axios";

const departmentData = [
  { id: 1, department: "Wordpress" },
  { id: 2, department: "Shopify" },
  { id: 3, department: "MERN" },
  { id: 4, department: "Architecture" },
  { id: 5, department: "Android Apps" },
  { id: 6, department: "Flutter" },
];

const sellersData = [
  {
    id: 1,
    name: "Ariful Islam",
    role: "Full Stack Developer",
    location: "Dhaka, BD",
    image: "https://i.pravatar.cc/150?u=arif",
  },
  {
    id: 2,
    name: "Anika Tabassum",
    role: "Frontend Engineer",
    location: "Chittagong, BD",
    image: "https://i.pravatar.cc/150?u=anika",
  },
];

// প্রতিটি department এর জন্য আলাদা leader
const leadersData = {
  Wordpress: [
    { id: 1, name: "Jasim Uddin", role: "WP Lead" },
    { id: 2, name: "Rakib Hasan", role: "WP Senior" },
  ],
  Shopify: [{ id: 3, name: "Sumaiya Akter", role: "Shopify Lead" }],
  MERN: [
    { id: 4, name: "Ariful Islam", role: "MERN Lead" },
    { id: 5, name: "Tanvir Ahmed", role: "MERN Senior" },
  ],
  Architecture: [{ id: 6, name: "Nadia Islam", role: "Architect Lead" }],
  "Android Apps": [{ id: 7, name: "Imran Hossain", role: "Android Lead" }],
  Flutter: [{ id: 8, name: "Farhan Kabir", role: "Flutter Lead" }],
};

const initialFormData = {
  projectId: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
  projectName: "",
  orderId: "",
  startedDate: new Date().toISOString().split("T")[0],
  deadline: "",
  progress: 0,
  status: "Active",
  requirement: "",
  budget: { amount: "", currency: "$" },
  sellerInfo: { name: "", role: "", image: "", location: "" },
  department: "",
  teamLeader: { name: "", id: "", role: "leader" },
  clientInfo: {
    name: "",
    fiverrUsername: "",
    fiverrProfileLink: "",
    country: "",
  },
  accessInfo: {
    domain: "",
    hosting: "",
    wpAdminUser: "",
    wpAdminPass: "",
    hostingUser: "",
    hostingPass: "",
  },
};

export default function AddProject() {
  const [formData, setFormData] = useState(initialFormData);
  const [availableLeaders, setAvailableLeaders] = useState([]);

  // যেকোনো nested বা flat field update করে
  const handleInputChange = (path, value) => {
    const keys = path.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [path]: value }));
    }
  };

  // Seller select → sellerInfo object আপডেট
  const handleSellerSelect = (e) => {
    const selected = sellersData.find((s) => s.name === e.target.value);
    if (selected) {
      setFormData((prev) => ({ ...prev, sellerInfo: { ...selected } }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sellerInfo: { name: "", role: "", image: "", location: "" },
      }));
    }
  };

  // Department select → leader list filter হয়, teamLeader reset
  const handleDepartmentSelect = (e) => {
    const dept = e.target.value;
    setFormData((prev) => ({
      ...prev,
      department: dept,
      teamLeader: { name: "", id: "", role: "leader" },
    }));
    setAvailableLeaders(leadersData[dept] || []);
  };

  // Leader select → team Leader object আপডেট
  const handleLeaderSelect = (e) => {
    const selected = availableLeaders.find(
      (l) => String(l.id) === e.target.value,
    );
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        teamLeader: {
          name: selected.name,
          id: selected.id,
          role: selected.role,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        teamLeader: { name: "", id: "", role: "leader" },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted data: ",formData)
    try {
      const res = await axios.post(
        `http://localhost:3000/add-project`,
        formData
      );
      console.log("Project added:", res.data);
      if (res.data?.data?.insertedId) {
        Swal.fire({
          title: "New project added!",
          icon: "success",
          draggable: true,
        });
        // Reset form
        setFormData({
          ...initialFormData,
          projectId: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
        });
        setAvailableLeaders([]);
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({ title: "Something went wrong!", icon: "error" });
    }
  };

  return (
    <div className="p-8 bg-[#F8F9FB] min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <div className="bg-orange-500 p-4 rounded-2xl text-white shadow-lg">
            <FaRocket size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              Launch New Project
            </h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-none mt-1">
              Project ID: {formData.projectId}
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Info */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Project Name"
              value={formData.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              placeholder="E-commerce App"
            />
            <InputField
              label="Order ID"
              value={formData.orderId}
              onChange={(e) => handleInputChange("orderId", e.target.value)}
              placeholder="#ORD-99281"
            />
            <InputField
              label="Deadline"
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => handleInputChange("deadline", e.target.value)}
            />
            <div className="flex gap-4">
              <InputField
                label="Budget"
                type="number"
                value={formData.budget.amount}
                onChange={(e) =>
                  handleInputChange("budget.amount", e.target.value)
                }
                placeholder="1200"
              />
              <div className="w-24 mt-7">
                <select
                  value={formData.budget.currency}
                  onChange={(e) =>
                    handleInputChange("budget.currency", e.target.value)
                  }
                  className="w-full bg-gray-50 border-none rounded-xl py-3 font-bold text-sm h-[46px] outline-none"
                >
                  <option value="$">$</option>
                  <option value="৳">৳</option>
                </select>
              </div>
            </div>

            {/* Client Info */}
            <InputField
              label="Client Name"
              value={formData.clientInfo.name}
              onChange={(e) =>
                handleInputChange("clientInfo.name", e.target.value)
              }
              placeholder="John Doe"
            />
            <InputField
              label="Fiverr Username"
              value={formData.clientInfo.fiverrUsername}
              onChange={(e) =>
                handleInputChange("clientInfo.fiverrUsername", e.target.value)
              }
              placeholder="johndoe_pro"
            />
            <InputField
              label="Country"
              value={formData.clientInfo.country}
              onChange={(e) =>
                handleInputChange("clientInfo.country", e.target.value)
              }
              placeholder="USA"
            />
            <InputField
              label="Profile Link"
              value={formData.clientInfo.fiverrProfileLink}
              onChange={(e) =>
                handleInputChange(
                  "clientInfo.fiverrProfileLink",
                  e.target.value,
                )
              }
              placeholder="https://www.fiverr.com/johndoe_pro"
            />

            {/* Seller */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                Assign Seller
              </label>
              <select
                value={formData.sellerInfo.name}
                onChange={handleSellerSelect}
                className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-sm outline-none"
              >
                <option value="">Select Seller</option>
                {sellersData.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {/* Selected seller preview */}
              {formData.sellerInfo.name && (
                <p className="text-xs text-gray-400 mt-1 ml-1">
                  {formData.sellerInfo.role} — {formData.sellerInfo.location}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                Assign Department
              </label>
              <select
                value={formData.department}
                onChange={handleDepartmentSelect}
                className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-sm outline-none"
              >
                <option value="">Select Department</option>
                {departmentData.map((m) => (
                  <option key={m.id} value={m.department}>
                    {m.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Leader — department select করলে তবেই দেখাবে */}
            <div className="md:col-span-1">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                Team Leader
              </label>
              <select
                value={formData.teamLeader.id}
                onChange={handleLeaderSelect}
                disabled={!formData.department}
                className={`w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-sm outline-none transition-opacity ${
                  !formData.department ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <option value="">
                  {formData.department
                    ? `Select Leader for ${formData.department}`
                    : "Select Department first"}
                </option>
                {availableLeaders.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Requirement — */}

            <InputField
              label="Project Requirement"
              value={formData.requirement}
              onChange={(e) => handleInputChange("requirement", e.target.value)}
              placeholder="Project requirement link"
            />
          </div>

          {/* Section 2: Domain & Access Info */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-sm mb-8">
              <FaLock size={18} /> Domain & Server Credentials
            </div>

            <div className="grid grid-cols-2 gap-6 mb-5">
              <InputField
                label="Domain"
                value={formData.accessInfo.domain}
                onChange={(e) =>
                  handleInputChange("accessInfo.domain", e.target.value)
                }
                placeholder="https://example.com"
              />
              <InputField
                label="Hosting Provider"
                value={formData.accessInfo.hosting}
                onChange={(e) =>
                  handleInputChange("accessInfo.hosting", e.target.value)
                }
                placeholder="Hostinger / GoDaddy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WP Admin Access */}
              <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase mb-1">
                  <SiWordpress /> WP Admin Access
                </div>
                <InputField
                  label="Admin User"
                  value={formData.accessInfo.wpAdminUser}
                  onChange={(e) =>
                    handleInputChange("accessInfo.wpAdminUser", e.target.value)
                  }
                  placeholder="admin"
                />
                <InputField
                  label="Admin Pass"
                  type="password"
                  value={formData.accessInfo.wpAdminPass}
                  onChange={(e) =>
                    handleInputChange("accessInfo.wpAdminPass", e.target.value)
                  }
                  placeholder="••••••••"
                />
              </div>

              {/* Hosting Access — আলাদা keys */}
              <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase mb-1">
                  <SiWordpress /> Hosting Access
                </div>
                <InputField
                  label="Email / Username"
                  value={formData.accessInfo.hostingUser}
                  onChange={(e) =>
                    handleInputChange("accessInfo.hostingUser", e.target.value)
                  }
                  placeholder="user@email.com"
                />
                <InputField
                  label="Hosting Pass"
                  type="password"
                  value={formData.accessInfo.hostingPass}
                  onChange={(e) =>
                    handleInputChange("accessInfo.hostingPass", e.target.value)
                  }
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-3xl font-black text-lg shadow-2xl hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <FaRocket /> Confirm & Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", onChange, placeholder, value }) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
        {label}
      </label>
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-sm focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300 placeholder:font-normal"
      />
    </div>
  );
}
