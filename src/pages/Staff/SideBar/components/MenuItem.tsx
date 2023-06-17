import React from 'react';
import { Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  link: string;
  active: string;
  id: string;
  activeIconSrc: any;
  inactiveIconSrc: any;
  name: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { link, active, id, activeIconSrc, inactiveIconSrc, name } = props;
  return (
    <NavLink
      to={link}
      className={(navData) =>
        navData.isActive
          ? 'text-primary text-t3 flex items-center gap-3 bg-[#EFEDFD] rounded-[8px] px-3 py-2 my-2'
          : 'text-black hover:bg-[#EFEDFD] rounded-[8px] text-t3 transition-[1.2s] flex items-center gap-3 px-3 py-2 my-2'
      }
    >
      <img src={active == id ? activeIconSrc : inactiveIconSrc} className="w-[20px] h-[20px] object-contain" />
      <Tooltip title={name} placement="right">
        <span className="line-clamp-1">{name}</span>
      </Tooltip>
    </NavLink>
  );
};

export default MenuItem;
