import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaBriefcase,
  FaUserTag,
} from "react-icons/fa";
import EmployeeCard from "./../../../components/Employee/EmployeeCard";
import MemberCard from "../../../components/Employee/MemberCard";
import { useParams } from "react-router";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const  projectId = useParams()

  // ডাটাবেজ থেকে ডাটা ফেচ করার সিমুলেশন
  useEffect(() => {
    // fetch('/api/employees').then(res => res.json()).then(data => setEmployees(data))
    const teamData = [
      {
        _id: "6601",
        name: "Ariful Islam",
        role: "Full Stack Developer",
        department: "MERN",
        image: "https://i.ibb.co/3S3mH37/profile1.png",
        type: "Leader",
        activeProjects: 2,
        rating: "4.9",
        team:"Code Hunter",
        email: "arif@company.com",
      },
      {
        _id: "6602",
        name: "Mahmudul Hasan",
        role: "Backend Specialist",
        department: "MERN",
        image: "https://i.ibb.co/3S3mH37/profile2.png",
        type: "Member",
        activeProjects: 3,
        rating: "4.7",
        team:"Code Hunter",
        email: "mahmud@company.com",
      },
      {
        _id: "6603",
        name: "Jasim Uddin",
        role: "Frontend Engineer",
        department: "MERN",
        image: "https://i.ibb.co/3S3mH37/profile3.png",
        type: "Member",
        activeProjects: 1,
        rating: "5.0",
        team:"Code Hunter",
        email: "jasim@company.com",
      },
      {
        _id: "6604",
        name: "Sumaiya Akter",
        role: "Shopify Expert",
        department: "Shopify",
        image: "https://i.ibb.co/3S3mH37/profile4.png",
        type: "Leader",
        activeProjects: 4,
        rating: "4.8",
        team:"Code Hunter",
        email: "sumaiya@company.com",
      },
      {
        _id: "6605",
        name: "Anika Tabassum",
        role: "Liquid Developer",
        department: "Shopify",
        image: "https://i.ibb.co/3S3mH37/profile5.png",
        type: "Member",
        activeProjects: 2,
        rating: "4.6",
        team:"Code Hunter",
        email: "anika@company.com",
      },
      {
        _id: "6606",
        name: "Tanvir Ahmed",
        role: "Shopify Designer",
        department: "Shopify",
        image: "https://i.ibb.co/3S3mH37/profile6.png",
        type: "Member",
        activeProjects: 0,
        rating: "4.5",
        team:"Code Hunter",
        email: "tanvir@company.com",
      },
      {
        _id: "6607",
        name: "Rashed Khan",
        role: "WP Customizer",
        department: "WordPress",
        image: "https://i.ibb.co/3S3mH37/profile7.png",
        type: "Leader",
        status: "Not Active",
        activeProjects: 1,
        rating: "4.9",
        team:"Code Hunter",
        email: "rashed@company.com",
      },
      {
        _id: "6608",
        name: "Nadia Islam",
        role: "Elementor Expert",
        department: "WordPress",
        image: "https://i.ibb.co/3S3mH37/profile8.png",
        type: "Member",
        activeProjects: 3,
        status: "Available",
        rating: "4.7",
        team:"Code Hunter",
        email: "nadia@company.com",
      },
      {
        _id: "6609",
        name: "Fahim Shahriar",
        role: "Plugin Developer",
        department: "WordPress",
        image: "https://i.ibb.co/3S3mH37/profile9.png",
        type: "Member",
        status: "Available",
        activeProjects: 2,
        rating: "4.8",
        team:"Code Hunter",
        email: "fahim@company.com",
      },
    ];
    setEmployees(teamData);
  }, []);


  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = filterDept === "All" || emp.department === filterDept;
    const matchesSearch = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleAssignWork = async (emp) => {
    console.log("Assigning work to:", emp.name)
    console.log("Assigning the project:", projectId.id)
    // এখানে নেভিগেশন বা মোডাল লজিক হবে

    const assignEmployee = {
        assignWork : emp.name,
        email      : emp.email,
        role       : emp.role,
        department : emp.department
    }


    console.log(assignEmployee)

    try {
        const res = await axios.patch(`http://localhost:3000/assign-project/${projectId.id}`,assignEmployee )
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }

  };

  const handleViewProfile = (emp) => {
    console.log("Viewing profile of:", emp.name);
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
          <p className="text-sm text-gray-500">
            Manage and assign tasks to your team members
          </p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-orange-100">
          <FaPlus size={14} /> Add New Employee
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or role..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-400 outline-none text-sm appearance-none cursor-pointer"
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Shopify">Shopify</option>
              <option value="WordPress">WordPress</option>
              <option value="MERN">MERN Stack</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.length > 0 ? (
          filteredEmployees?.map((emp) => (
            <div key={emp._id} className="relative group">
              <EmployeeCard
                employee={emp}
                actionLabel="View Profile"
                onAction={handleViewProfile}
              />

              {/* <MemberCard
                employee={emp}
                actionLabel="View Profile"
                onAction={handleViewProfile}
              ></MemberCard> */}

              {/* Overlay Actions for Admin - মাউস নিলে ভেসে উঠবে */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleAssignWork(emp)}
                  title="Assign Work"
                  className="p-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all"
                >
                  <FaBriefcase size={14} />
                </button>
                <button
                  title="Make Leader"
                  className="p-2 bg-white text-orange-600 rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition-all"
                >
                  <FaUserTag size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-400 size-6" />
            </div>
            <h3 className="text-gray-600 font-bold">No employees found</h3>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
