import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaGithub, FaFacebook, FaEnvelope, FaLock, FaRocket, } from "react-icons/fa";
import { motion } from "framer-motion";
import { use } from "react";
import AuthContext from "./../../Context/AuthContext"

export default function Login() {

  const navigate = useNavigate()
  const location = useLocation()


  const { signIn } = use(AuthContext)



  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log(email, password);

    try {

      const result = await signIn(email, password);
      console.log("User Login Successfull.", result);
      navigate(location.state || '/')

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side: Dark Branding (Color 1) */}
        <div className="md:w-5/12 bg-[#1e293b] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Background Abstract Shape */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-orange-500 rounded-2xl">
                <FaRocket className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tighter">
                Office Pilot
              </h2>
            </div>
            <h3 className="text-4xl font-bold leading-tight">
              Manage your <br />
              <span className="text-orange-500">Agency</span> like <br />a Pro.
            </h3>
            <p className="text-gray-400 mt-6 text-sm leading-relaxed">
              সিস্টেমে লগইন করে আপনার টিমের মেম্বার এবং প্রজেক্টের লাইভ আপডেট
              ট্র্যাক করুন।
            </p>
          </div>

          <div className="relative z-10 border-t border-gray-700 pt-6">
            <p className="text-xs text-gray-500 font-medium italic">
              "Efficiency is doing things right; effectiveness is doing the
              right things."
            </p>
          </div>
        </div>

        {/* Right Side: Login Form (Color 2) */}
        <div className="md:w-7/12 p-12 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-800">Welcome Back</h2>
            <p className="text-gray-400 font-medium">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full pl-14 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-600">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-14 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium transition-all outline-none"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-600 transition-all transform hover:-translate-y-1 active:scale-95">
              Sign In to Dashboard
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Or login with
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <button className="flex-1 flex justify-center py-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
              <FaGoogle className="text-red-500" size={22} />
            </button>
            <button className="flex-1 flex justify-center py-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
              <FaGithub className="text-gray-900" size={22} />
            </button>
            <button className="flex-1 flex justify-center py-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
              <FaFacebook className="text-blue-600" size={22} />
            </button>
          </div>

          <p className="text-center mt-10 text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-600 font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
