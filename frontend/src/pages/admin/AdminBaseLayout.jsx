import React from "react";
import AdminTopBar from "../../components/admin/AdminTopBar.jsx";
import AdminSideBar from "../../components/admin/AdminSideBar.jsx";

const AdminBaseLayout = ({ children }) => {
  return (
    <div>
      <div className="w-full z-50">
        <AdminTopBar />
      </div>
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
        <AdminSideBar />
      </div>
      <div className="pt-16 pl-50">
        {children}
      </div>
    </div>
  );
};

export default AdminBaseLayout;
