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
    <div className="relative">
      {/* Top bar icons */}
      <div className="flex items-center gap-4 cursor-pointer">
        <Bell size={24} className="text-gray-600 hover:text-blue-600 transition-colors duration-200" />
        <CircleUser
          size={28}
          className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          onClick={() => setShowProfile((prev) => !prev)}
        />
      </div>

      {/* Dropdown profile menu */}
      {showProfile && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
          <p className="text-gray-800 font-semibold text-sm text-center mb-2">
            {username}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md py-1.5 transition-all"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;
