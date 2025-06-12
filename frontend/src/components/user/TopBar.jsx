import React from "react";
import ProfileBadge from "./ProfileBadge";

const TopBar = () => {
  return (
    <div class="fixed flex justify-between top-0 py-3 px-10 w-screen bg-blue-200 items-center border-b border-gray-300 border-b-3 border-opacity-50">
      <span class="font-bold text-lg">JemuDraws</span>
      <ProfileBadge />
    </div>
  );
};

export default TopBar;
