import React from "react";
import ProfileBadge from "./ProfileBadge";

const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-100/80 backdrop-blur-md shadow-sm border-b border-blue-300 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="text-xl font-semibold text-blue-800 tracking-wide">
          JemuDraws
        </span>
        <ProfileBadge />
      </div>
    </header>
  );
};

export default TopBar;
