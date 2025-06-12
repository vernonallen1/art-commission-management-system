import React, { useState } from "react";
import { CircleUser, Bell } from "lucide-react";

const ProfileBadge = () => {
  const [showProfile, setShowProfile] = useState(false);
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <div class="flex items-center py-2 px-3 rounded-md space-x-2 gap-x-3">
        <Bell size={25} />
        <CircleUser size={25} onClick={() => setShowProfile(!showProfile)} />
      </div>
      {showProfile && (
        <div className="absolute top-12 right-10 h-30 w-30 bg-blue-100 border-1 border-gray-200 p-1 rounded-xl flex flex-col items-center justify-center">
          <p>{username}</p>
          <button
            className="font-bold bg-red-400 p-1 rounded-md mt-2"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;
