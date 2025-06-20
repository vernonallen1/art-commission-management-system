import React from "react";
import { useNavigate } from "react-router-dom";

const SideBarTile = ({ title, icon: Icon, route }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => route && navigate(route)}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium text-base"
    >
      {Icon && <Icon size={20} />}
      <span>{title}</span>
    </button>
  );
};

export default SideBarTile;
