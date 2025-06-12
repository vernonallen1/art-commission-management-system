import React from "react";
import SideBarTile from "../SideBarTile";
import { House, Palette, Store, ShoppingBag } from "lucide-react";

const SideBar = () => {
  return (
    <div
      id="component"
      class="fixed p-5 h-screen fixed left-0 flex flex-col space-y-7"
    >
      <SideBarTile title="Home" icon={House} route="/" />
      <SideBarTile title="Commissions" icon={Palette} route="/commission" />
      <SideBarTile title="Marketplace" icon={Store} />
      <SideBarTile title="Purchases" icon={ShoppingBag} />
    </div>
  );
};

export default SideBar;
