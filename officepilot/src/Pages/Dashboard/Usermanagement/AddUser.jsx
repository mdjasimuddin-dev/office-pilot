import React, { useState } from 'react';
import { User, Mail, ShieldCheck, Lock, Save, RotateCcw } from 'lucide-react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'user',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // এখানে আপনার API Call (যেমন Axios/Fetch) হবে
    console.log("Adding User:", formData);

    setTimeout(() => {
      setLoading(false);
      alert("User added successfully!");
      setFormData({ fullName: '', email: '', role: 'user', password: '' });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Create New User</h2>
        <p className="text-sm text-gray-500">Fill in the information to add a user manually to the system.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jasim Uddin"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jasim@dev.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Select Role</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white appearance-none cursor-pointer"
              >
                <option value="user">Guest</option>
                <option value="user">member</option>
                <option value="user">leader</option>
                <option value="user">team-leader</option>
                <option value="user">admin</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Set Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t mt-4">
          <button
            type="button"
            onClick={() => setFormData({ fullName: '', email: '', role: 'user', password: '' })}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-all"
          >
            <RotateCcw size={18} /> Reset
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </span>
            ) : (
              <>
                <Save size={18} /> Save User
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;