import React from "react";
import SideBar from "../../components/user/SideBar.jsx";
import TopBar from "../../components/user/TopBar.jsx";

const BaseLayout = ({ children }) => {
  return (
    <div>
      <div className="w-full z-50">
        <TopBar />
      </div>
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
        <SideBar />
      </div>

      <div className="pt-16 pl-50">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
