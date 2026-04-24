import React, { useEffect, useState } from "react";

export default function SocialFeed() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("./recentWork.json")
      .then((res) => res.json())
      .then((data) => setActivities(data));
  }, []);

  console.log(activities);

  return (
    <div className="grid grid-cols-2 gap-5 mt-5">
      {activities.map((activity) => (
        <div className="shadow-xl p-3 border-1 border-slate-200 rounded-xl">
          {/* card heading */}
          <div className="flex justify-between">
            {/* Member Info  */}
            <div className="flex">
              <div>
                <div className="h-10 w-10 rounded-full bg-slate-400 flex justify-center items-center text-xl mr-2">
                  A
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <h1 className="uppercase text-xl">{activity.userName}</h1>
                </div>
                <div className="flex items-center">
                  <p className="bg-green-100 text-[10px] px-2 text-green-600 border-1 rounded-2xl mr-1">
                    {activity.teamName}
                  </p>
                  <h1 className="text-[12px]">
                    {new Date(activity.createdAt).toLocaleString("en-US",{dateStyle:"medium", timeStyle:"short"})}
                  </h1>
                </div>
              </div>
            </div>

            {/* Client Info  */}
            <div className="">
              <h1 className="uppercase">{activity.clientName}</h1>
              <p>Amount: ${activity.amount}</p>
            </div>
          </div>

          {/* card body  */}

          <div>
            <h2 className="text-lg font-bold">{activity.projectName}</h2>
            <p>
              {activity.workSummary}
            </p>
          </div>
        </div>
      ))}
      
    </div>
  );
}
