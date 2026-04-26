import { useEffect, useState, use } from "react";
import useAxiosSecure from "./AxiosSecure";
import AuthContext from "../Context/AuthContext";

const useRole = () => {
  const { user } = use(AuthContext); // Context থেকে ইউজার নিলেন
  const [role, setRole] = useState(null); // রোল সেভ করার জন্য স্টেট
  const [isRoleLoading, setIsRoleLoading] = useState(true); // লোডিং স্টেট
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // যদি ইউজার ইমেইল থাকে তবেই কল করবে
    if (user?.email) {
      axiosSecure.get(`/user?email=${user.email}`)
        .then(res => {
            // console.log(res?.data?.data?.role)
          setRole(res?.data?.data?.role); // সার্ভার থেকে পাওয়া রোল সেভ করা
          setIsRoleLoading(false);
        })
        .catch(err => {
          console.error("Role fetch error:", err);
          setIsRoleLoading(false);
        });
    }
  }, [user?.email, axiosSecure]); // ইমেইল চেঞ্জ হলে আবার রান হবে

  return [role, isRoleLoading]; // রোল এবং লোডিং স্টেট রিটার্ন করবে
};

export default useRole;