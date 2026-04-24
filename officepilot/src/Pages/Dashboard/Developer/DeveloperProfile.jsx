import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaGlobe, FaCode, FaRocket } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiNodedotjs, SiMongodb } from "react-icons/si";

export default function DeveloperProfile() {
  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Profile Card */}
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left Side: Image & Socials */}
          <div className="md:w-1/3 bg-orange-500 p-10 text-white flex flex-col items-center justify-center text-center">
            <div className="w-40 h-40 rounded-3xl border-4 border-white/30 overflow-hidden shadow-2xl mb-6 rotate-3">
              <img 
                src="https://i.ibb.co.com/zWhspmFx/IMG-8088.jpg" // আপনার ছবি এখানে দিন
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-black italic">MD JASIM UDDIN</h2>
            <p className="text-orange-100 text-sm mb-6">Full Stack Developer</p>
            
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><FaGithub size={20}/></a>
              <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><FaLinkedin size={20}/></a>
              <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><FaWhatsapp size={20}/></a>
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="md:w-2/3 p-12">
            <h3 className="text-3xl font-black text-gray-800 mb-4">Hello, I'm <span className="text-orange-500">The Mind</span> behind MJ SOFT Pilot.</h3>
            <p className="text-gray-500 leading-relaxed mb-8">
              আমি একজন প্যাশনেট ফুল-স্ট্যাক ডেভেলপার, যার মূল লক্ষ্য হলো জটিল বিজনেস প্রোসেসগুলোকে সহজ এবং অটোমেটেড সফটওয়্যার সমাধানে রূপান্তর করা। এই সিস্টেমটি আমার দীর্ঘদিনের অভিজ্ঞতা এবং পরিশ্রমের ফল।
            </p>

            {/* Expertise Section */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FaCode size={24}/></div>
                <div>
                  <h4 className="font-bold text-gray-800">Clean Code</h4>
                  <p className="text-xs text-gray-400 font-medium tracking-tight">Writing scalable and maintainable code.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><FaRocket size={24}/></div>
                <div>
                  <h4 className="font-bold text-gray-800">Fast Performance</h4>
                  <p className="text-xs text-gray-400 font-medium tracking-tight">Optimizing apps for lightning speed.</p>
                </div>
              </div>
            </div>

            {/* Skills Icons */}
            <div>
              <h4 className="font-black text-gray-400 uppercase text-xs tracking-[0.2em] mb-4">My Core Stack</h4>
              <div className="flex gap-6 text-gray-300">
                <SiReact size={35} className="hover:text-blue-400 transition-colors cursor-pointer"/>
                <SiTailwindcss size={35} className="hover:text-cyan-400 transition-colors cursor-pointer"/>
                <SiNodedotjs size={35} className="hover:text-green-500 transition-colors cursor-pointer"/>
                <SiMongodb size={35} className="hover:text-green-600 transition-colors cursor-pointer"/>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gray-900 rounded-[2rem] p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Have a project in mind?</h3>
          <p className="text-gray-400 text-sm mb-6">Let's build something extraordinary together.</p>
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20">
            Hire Me on Fiverr
          </button>
        </div>

      </div>
    </div>
  );
}