import React from 'react';
import { House, Palette, Store, ShoppingBag   } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SideBarTile = ({title, icon: Icon, route}) => {
  const navigate = useNavigate();
  return (
    <div class='p-2 hover:bg-blue-300 rounded-md font-bold flex space-x-2' onClick={(() => navigate(route))}>  
        {Icon && <Icon />} 
        <span>{title}</span>
    </div>
  )
}

export default SideBarTile