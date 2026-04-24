import { use } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaUser,
  FaEnvelope,
  FaLock,
  FaRocket,
  FaCheckCircle,
  FaPhotoVideo,
} from "react-icons/fa";
import { motion } from "framer-motion";
// import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { MdAddAPhoto } from "react-icons/md";

export default function SignUp() {

  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure();

  const {userCreate, userProfileUpdate} = useContext(AuthContext)

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    console.log(email, password, name, photo);

    try {
      const result = await userCreate(email, password);
      console.log("User Create Successfull.", result);

      const UserData = {
        name: name,
        email: email,
        password: password,
        photo: photo
      };

      axios.post("http://localhost:3000/userCreate", UserData)
        .then((res) =>  {
          console.log(res.data);
           userProfileUpdate(name, photo)

          if (res?.data?.insertedId) {
            console.log("user added to the database");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white w-full max-w-5xl rounded-[3rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row min-h-[650px]"
      >
        {/* Left Side: Dark Branding (Color 1) */}
        <div className="md:w-5/12 bg-[#1e293b] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Background Shape */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-orange-500 rounded-2xl">
                <FaRocket className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tighter">
                Office Pilot
              </h2>
            </div>

            <h3 className="text-4xl font-bold leading-tight mb-8">
              Start your <br />
              <span className="text-orange-500">Journey</span> with <br />
              us today.
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-orange-500 text-lg" />
                <p className="text-gray-300 text-sm font-medium">
                  Full Agency Control
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-orange-500 text-lg" />
                <p className="text-gray-300 text-sm font-medium">
                  Team Performance Analytics
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-orange-500 text-lg" />
                <p className="text-gray-300 text-sm font-medium">
                  Secure Project Management
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <p className="text-xs text-gray-500 font-medium">
              Join 100+ agencies worldwide using Office Pilot.
            </p>
          </div>
        </div>

        {/* Right Side: SignUp Form (Color 2) */}
        <div className="md:w-7/12 p-12 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-400 font-medium mt-1">
              Get started for free today
            </p>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium transition-all outline-none"
                />
              </div>
            </div>



            {/* User Photo */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
                Profile Photo
              </label>
              <div className="relative">
                <MdAddAPhoto className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="photo"
                  name="photo"
                  placeholder="User profile photo"
                  className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium transition-all outline-none"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-900 transition-all transform hover:-translate-y-1 active:scale-95 mt-4">
              Create My Account
            </button>
          </form>

          {/* Social Sign Up */}
          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Register with
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex justify-center py-3 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
              <FaGoogle className="text-red-500" size={20} />
            </button>
            <button className="flex-1 flex justify-center py-3 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
              <FaGithub className="text-gray-900" size={20} />
            </button>
            <button className="flex-1 flex justify-center py-3 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
              <FaFacebook className="text-blue-600" size={20} />
            </button>
          </div>

          <p className="text-center mt-8 text-gray-500 font-medium">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
