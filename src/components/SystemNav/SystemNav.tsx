import { useEffect, useState } from 'react';
import { setCurrentUser } from 'src/redux/slices/authSlice';
import { setMobileOpen, setOpenDropDown } from 'src/redux/slices/contextSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import Logo from 'src/share/Logo/Logo';
import styles from 'src/utils/style';

// ** lib
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import jwt_decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';

// ** assets
import logout from 'src/assets/images/Logout.svg';
import manage from 'src/assets/images/Stack.svg';
import avatar from 'src/assets/images/avatar.svg';
import dropDown from 'src/assets/images/drop_down.svg';
import sidebarmenu from 'src/assets/images/menu.svg';

const SystemNav = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const location = useLocation();

  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    switch (location.pathname.split('/')[1]) {
      case 'nodes':
        setShowLogo(false);
        break;
      case 'sensors':
        setShowLogo(false);
        break;
      case 'location':
        setShowLogo(false);
        break;
      default:
        setShowLogo(true);
        break;
    }
  }, [location]);

  let decoded_jwt: any = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const context = useAppSelector((state) => state.context);
  const mobileOpen = useAppSelector((state) => state.context.mobileOpen);

  //**  Get shopping cart, set account info
  useEffect(() => {
    if (decoded_jwt) {
      dispatch(setCurrentUser(decoded_jwt));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/login');
    dispatch(setOpenDropDown());
  };

  const handleNavigatePersonal = () => {
    navigate(`/personal/${decoded_jwt.sub}`);
    dispatch(setOpenDropDown());
  };

  const handleNavigateManage = (role: string) => {
    dispatch(setOpenDropDown());
    switch (role) {
      case 'ADMIN':
        navigate('/admin');
        break;
      case 'STAFF':
        navigate('/nodes');
        break;
      case 'USER':
        navigate('/nodes');
        break;
      default:
        break;
    }
  };

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!mobileOpen));
  };

  return (
    <nav
      className={`${styles.flexCenter} px-5 w-full h-[72px] fixed top-0 bg-white z-[100] border-b-gray-200 border-b font-poppins`}
    >
      <div className={`${styles.container} ${styles.flexBetween} flex justify-between `}>
        {showLogo ? (
          <div onClick={() => navigate('/')} className="w-[90px] cursor-pointer">
            <Logo />
          </div>
        ) : (
          <div className="w-[90px]">
            <div className="sm:hidden block">
              <IconButton onClick={() => handleDrawerToggle()}>
                <img src={sidebarmenu} />
              </IconButton>
            </div>
          </div>
        )}

        <div className="relative">
          <div
            onClick={() => dispatch(setOpenDropDown())}
            className="pl-4 py-3 flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="">
              <img
                src={decoded_jwt.avatar ? decoded_jwt.avatar : avatar}
                className="object-contain w-[30px] h-[30px] rounded-full"
              />
            </div>

            <div className="flex items-center gap-2 ">
              <p className="font-medium text-t3 text-[#565D6D]">{decoded_jwt.firstName + ' ' + decoded_jwt.lastName}</p>
              <img
                src={dropDown}
                className={`w-[10px] h-[5px] object-contain transform ${context.openDropDown ? 'rotate-180' : ''} `}
              />
            </div>
          </div>

          {/* dropdown */}
          <AnimatePresence>
            {context.openDropDown && (
              <motion.ul
                initial={{ y: '50%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                exit={{ y: '50%', opacity: 0 }}
                className="absolute top-15 right-0 bg-white rounded-[10px] w-max drop-shadow-lg"
              >
                <li
                  onClick={() => handleNavigatePersonal()}
                  className="flex items-center gap-3 px-5 py-3 cursor-pointer transition hover:bg-gray-100 rounded-tr-[10px] rounded-tl-[10px]"
                >
                  <img src={avatar} className="w-[24px] h-[24px] object-contain" />
                  <p className="text-t3">Personal Information</p>
                </li>
                <li
                  onClick={() => handleNavigateManage(decoded_jwt.role)}
                  className="flex items-center gap-3 cursor-pointer px-5 py-3 transition hover:bg-gray-100"
                >
                  <img src={manage} className="w-[25px] h-[25px] object-contain" />
                  <p className="text-t3">Manage</p>
                </li>
                <li
                  onClick={() => handleLogout()}
                  className="flex items-center gap-3 cursor-pointer px-5 py-3 transition hover:bg-gray-100 rounded-br-[10px] rounded-bl-[10px]"
                >
                  <img src={logout} className="w-[25px] h-[25px] object-contain" />
                  <p className="text-t3">Log out</p>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default SystemNav;
