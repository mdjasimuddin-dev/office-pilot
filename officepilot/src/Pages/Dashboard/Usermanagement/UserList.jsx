import React, { useEffect, useState } from "react";
import { Edit2, Trash2, UserPlus, Search, Filter } from "lucide-react";
import useAxiosSecure from "../../../Hooks/AxiosSecure";
import { Link } from "react-router";

const UserList = () => {
  // ডামি ইউজার ডেটা
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Md Jasim Uddin",
      email: "jasim@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahat Islam",
      email: "rahat@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Anika Tabassum",
      email: "anika@example.com",
      role: "User",
      status: "Active",
    },
  ]);


  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/all-users`)
      .then((res) => {
        console.log("All Users Data:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [axiosSecure]);




  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
          <p className="text-sm text-gray-500">
            Manage all registered users and their roles.
          </p>
        </div>
        <Link to='/admin/add-user' className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
          <UserPlus size={18} /> Add New User
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-t-xl border-b flex flex-wrap gap-4 justify-between items-center">
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Search users..."
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 text-gray-600">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-b-xl shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <th className="px-6 py-4 border-b">User Info</th>
              <th className="px-6 py-4 border-b">Role</th>
              <th className="px-6 py-4 border-b">Status</th>
              <th className="px-6 py-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-700">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
