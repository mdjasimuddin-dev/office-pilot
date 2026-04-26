// import React from "react";
// import AdminHome from "./Roles/AdminHome";
// import LeaderHome from "./Roles/LeaderHome";
// import TeamLeaderHome from "./Roles/TeamLeaderHome";
// import MemberHome from "./Roles/MemberHome";
// import GuestHome from "./Roles/GuestHome";

import useRole from "../../Hooks/useRole";
import AdminHome from "./AdminHome";

export default function Home() {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <div>Loading cockpit...</div>;
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      {/* Dynamic Greetings based on time */}
      <h1 className="text-2xl font-bold mb-6">Good Morning, {role}!</h1>

      {/* Role specific components */}
      {role === "admin" && <AdminHome />}
      {role === "leader" && <LeaderHome />}
      {role === "team leader" && <TeamLeaderHome />}
      {role === "member" && <MemberHome />}
      {role === "guest" && <GuestHome />}
    </div>
  );
}
