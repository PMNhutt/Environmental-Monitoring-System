import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from 'src/share/Logo/Logo';
import MenuItem from './components/MenuItem';

// ** assets
import warehouse from 'src/assets/images/Warehouse.svg';
import warehouseInactive from 'src/assets/images/WarehouseInactive.svg';
import activeNode from 'src/assets/images/node_menu_active.svg';
import inactiveNode from 'src/assets/images/node_menu_inactive.svg';
import activeSensor from 'src/assets/images/sensor.svg';
import inactiveSensor from 'src/assets/images/sensor_menu_inactive.svg';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('nodes');

  useEffect(() => {
    // console.log(location.pathname.split('/'));
    const locationMenu = location.pathname.split('/');
    setActive(locationMenu[1]);
  }, [location]);

  return (
    <div className="font-poppins">
      <div onClick={() => navigate('/')} className="w-[90px] cursor-pointer">
        <Logo />
      </div>

      <div className="my-10">
        <MenuItem
          link="/nodes"
          active={active}
          id="nodes"
          name="Nodes List"
          activeIconSrc={activeNode}
          inactiveIconSrc={inactiveNode}
        />
        <MenuItem
          link="/sensors"
          active={active}
          id="sensors"
          name="Sensors List"
          activeIconSrc={activeSensor}
          inactiveIconSrc={inactiveSensor}
        />
        <MenuItem
          link="/location"
          active={active}
          id="location"
          name="Location"
          activeIconSrc={warehouse}
          inactiveIconSrc={warehouseInactive}
        />
      </div>
    </div>
  );
};

export default SideBar;
