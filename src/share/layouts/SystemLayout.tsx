import React, { useEffect, useState } from 'react';
import SystemNav from 'src/components/SystemNav/SystemNav';
import SideBar from 'src/pages/Staff/SideBar/SideBar';

import { setMobileOpen } from 'src/redux/slices/contextSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';

import { useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';

const SystemLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [allowRoute, setAllowRoute] = useState(false);
  const dispatch = useAppDispatch();
  const mobileOpen = useAppSelector((state) => state.context.mobileOpen);
  // const [mobileOpen, setMobileOpen] = useState(false);

  // ** show menu on condition
  useEffect(() => {
    switch (location.pathname.split('/')[1]) {
      case 'nodes':
        setAllowRoute(true);
        break;
      case 'sensors':
        setAllowRoute(true);
        break;
      default:
        setAllowRoute(false);
        break;
    }
  }, [location]);

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!mobileOpen));
  };

  return (
    <div>
      <SystemNav />
      <div className={`${allowRoute ? 'flex' : ''} justify-center sm:flex-row flex-col `}>
        {allowRoute && (
          <>
            <>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 210 },
                }}
              >
                <div className="py-3 px-3">
                  <SideBar />
                </div>
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 210 },
                }}
                open
              >
                <div className="py-3 px-3">
                  <SideBar />
                </div>
              </Drawer>
            </>
            <div className={`w-[243px] sm:block xl3:hidden hidden font-poppins`}></div>
          </>
        )}

        <div className="font-poppins mt-[72px] w-full">{children}</div>
      </div>
    </div>
  );
};

export default SystemLayout;
