import React, { useEffect, useState } from "react";
import {
  FaRocket,
  FaUserShield,
  FaGlobe,
  FaUsers,
  FaLock,
  FaServer,
} from "react-icons/fa";
import { SiFiverr, SiWordpress } from "react-icons/si";
import axios from "axios";
import useAxiosSecure from "../../../../Hooks/AxiosSecure";
import { useParams } from "react-router";

// ১. ডামি ডাটা
const departmentData = [
  {
    id: 1,
    department: "Wordpress",
    image: "https://i.pravatar.cc/150?u=rahim",
  },
  {
    id: 2,
    department: "Shopify",
    image: "https://i.pravatar.cc/150?u=jasim",
  },
  {
    id: 3,
    department: "MERN",
    image: "https://i.pravatar.cc/150?u=jasim",
  },
  {
    id: 4,
    department: "Architechture",
    image: "https://i.pravatar.cc/150?u=jasim",
  },
  {
    id: 5,
    department: "Android Apps",
    image: "https://i.pravatar.cc/150?u=jasim",
  },
  {
    id: 6,
    department: "Fluter",
    image: "https://i.pravatar.cc/150?u=jasim",
  },
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

export default function UpdateProject() {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [department, setDepartment] = useState([]);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    projectId: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
    projectName: "",
    orderId: "",
    startedDate: new Date().toISOString().split("T")[0],
    deadline: "",
    progress: 0,
    status: "Active",
    budget: { amount: "", currency: "$" },
    sellerInfo: { name: "", role: "", image: "", location: "" },
    teamMember: { name: "Unassign", team: "Unassign", image: "", role: "" },
    department: department,
    clientInfo: {
      name: "",
      fiverrUsername: "",
      fiverrProfileLink: "",
      country: "",
    },
    accessInfo: { domain: "", wpAdminUser: "", wpAdminPass: "", hosting: "" },
  });

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

  const handleSellerSelect = (e) => {
    const val = e.target.value;
    const selected = sellersData.find((s) => s.name === val);
    if (selected) {
      setFormData((prev) => ({ ...prev, sellerInfo: { ...selected } }));
    }
  };

  const handleDepartmentSelect = async (e) => {
    const department = e.target.value;
    setDepartment(department);

    departmentData.find((m) => m.name === department);
    const res = await fetch(
      `http://localhost:3000/leaders?department=${department}`,
    );

    const data = await res.json();
    console.log("Leader Selected", data[0].name);
    setLeaders(data);
  };

  useEffect(() => {
    axiosSecure
      .get(`/project/${id}`)
      .then((res) => {
        console.log("All project data get", res);
        setProjects(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  console.log("single project data access for edit", projects.data);

  // const handleDepartmentSelect = (e) => {
  //   const val = e.target.value;
  //   const selected = departmentData.find((m) => m.name === val);
  //   if (selected) {
  //     setFormData((prev) => ({ ...prev, teamMember: { ...selected } }));
  //   }
  // };

  // const handleLeaderSelect = (e) => {
  //   const val = e.target.value;
  //   const selected = teamLeadersData.find((m) => m.name === val);
  //   if (selected) {
  //     setFormData((prev) => ({ ...prev, teamLeader: { ...selected } }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.post(`/update-project/${projects.id}}`, formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    console.log("Submitting Project Data:", formData);

    // alert("Project Data Saved Successfully!");
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
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              placeholder={projects?.data?.projectName}
            />
            <InputField
              label="Order ID"
              onChange={(e) => handleInputChange("orderId", e.target.value)}
              placeholder={projects?.data?.orderId}
            />
            <InputField
              label="Deadline"
              type="datetime-local"
              onChange={(e) => handleInputChange("deadline", e.target.value)}
              // placeholder={projects?.data?.deadline}
            />
            <div className="flex gap-4">
              <InputField
                label="Budget"
                type="number"
                onChange={(e) =>
                  handleInputChange("budget.amount", e.target.value)
                }
                placeholder={projects?.data?.budget?.amount}
              />
              <div className="w-24 mt-7">
                <select
                  onChange={(e) =>
                    handleInputChange("budget.currency", e.target.value)
                  }
                  className="w-full bg-gray-50 border-none rounded-xl py-3 font-bold text-sm h-[46px] outline-none"
                >
                  <option>$</option>
                  <option>৳</option>
                </select>
              </div>
            </div>

            <InputField
              className="w-full"
              label="Client Name"
              onChange={(e) =>
                handleInputChange("clientInfo.name", e.target.value)
              }
              placeholder={projects?.data?.clientInfo?.name}
            />
            <InputField
              label="Fiverr Username"
              className="w-full"
              onChange={(e) =>
                handleInputChange("clientInfo.fiverrUsername", e.target.value)
              }
              placeholder={projects?.data?.clientInfo?.fiverrUsername}
            />
            <InputField
              label="Country"
              className="w-full"
              onChange={(e) =>
                handleInputChange("clientInfo.country", e.target.value)
              }
              placeholder={projects?.data?.clientInfo?.country}
            />

            {/* client profile link */}
            <InputField
              label="Profile Link"
              className="w-full"
              onChange={(e) =>
                handleInputChange(
                  "clientInfo.fiverrProfileLink",
                  e.target.value,
                )
              }
              placeholder="https://www.fiverr.com/johndoe_pro"
            />

            {/* Seller */}
            <div className="bg-white rounded-[2.5rem] ">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                Assign Seller
              </label>
              <select
                onChange={handleSellerSelect}
                className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 mb-2 font-bold text-sm outline-none"
              >
                <option value="">Select Seller</option>
                {sellersData.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Member */}
            <div className="bg-white rounded-[2.5rem] ">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                Assign Department
              </label>
              <select
                onChange={handleDepartmentSelect}
                className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 mb-2 font-bold text-sm outline-none"
              >
                <option value="">Select Department</option>
                {departmentData.map((m) => (
                  <option key={m.id} value={m.department}>
                    {m.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Leader */}
            <div className="bg-white rounded-[2.5rem] ">
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                Team Leader
              </label>

              <div
                className={`w-full bg-gray-50 border-none rounded-xl py-2 px-4 mb-2 font-bold text-sm outline-none `}
              >
                {leaders.map((leader) => (
                  <option key={leader._id} value={leader._id} className={``}>
                    {leader.name}
                  </option>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Domain & Access Info (নতুন যোগ করা হয়েছে) */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-sm mb-8">
              <FaLock size={18} /> Domain & Server Credentials
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="Domain"
                className="w-full"
                onChange={(e) =>
                  handleInputChange("accessInfo.domain", e.target.value)
                }
                placeholder={projects?.data?.accessInfo?.domain}
              />
              <InputField
                label="Hosting Provider"
                className="w-full"
                onChange={(e) =>
                  handleInputChange("accessInfo.hosting", e.target.value)
                }
                placeholder={projects?.data?.accessInfo?.hosting}
              />
            </div>

            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Wordpress Access Card Look */}
              <div className="col-span-1 md:col-span-2 bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase mb-1">
                  <SiWordpress /> WP Admin Access
                </div>
                <InputField
                  label="Admin User"
                  onChange={(e) =>
                    handleInputChange("accessInfo.wpAdminUser", e.target.value)
                  }
                  placeholder="admin"
                />
                <InputField
                  label="Admin Pass"
                  type="password"
                  onChange={(e) =>
                    handleInputChange("accessInfo.wpAdminPass", e.target.value)
                  }
                  placeholder="••••••••"
                />
              </div>
              {/* Hosting Access Card Look */}

              <div className="col-span-1 md:col-span-2 bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase mb-1">
                  <SiWordpress /> Hosting Access
                </div>
                <InputField
                  label="Email/username"
                  onChange={(e) =>
                    handleInputChange("accessInfo.wpAdminUser", e.target.value)
                  }
                  placeholder="admin"
                />
                <InputField
                  label="Hosting Pass"
                  type="password"
                  onChange={(e) =>
                    handleInputChange("accessInfo.wpAdminPass", e.target.value)
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

// Reusable Input Component
function InputField({ label, type = "text", onChange, placeholder, value }) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-sm focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300 placeholder:font-normal"
      />
    </div>
  );
}
