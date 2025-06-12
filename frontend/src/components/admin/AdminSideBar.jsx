import SideBarTile from "../SideBarTile";
import { LayoutDashboard, Palette, Box, History } from "lucide-react";

const AdminSideBar = () => {
  return (
    <div
      id="component"
      class="fixed p-5 h-screen fixed left-0 flex flex-col space-y-7"
    >
      <SideBarTile title="Dashboard" icon={LayoutDashboard} route="/admin" />
      <SideBarTile title="Commissions" icon={Palette} route="/commissions" />
      <SideBarTile title="Products" icon={Box} route="/products" />
      <SideBarTile title="Logs" icon={History} route="/logs"/>
    </div>
  );
};

export default AdminSideBar;
