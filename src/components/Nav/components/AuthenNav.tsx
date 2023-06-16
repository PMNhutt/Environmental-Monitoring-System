import React, { useState } from 'react';
import avatar from 'src/assets/images/avatar.svg';
import logout from 'src/assets/images/Logout.svg';
import manage from 'src/assets/images/Stack.svg';

import { UserDetailProps } from 'src/utils/interface';

// ** lib
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AuthenNavProps {
  data: UserDetailProps;
}

const AuthenNav: React.FC<AuthenNavProps> = (props) => {
  const { data } = props;
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/login');
    // dispatch(setAccountInfo({}));
  };

  const handleNavigateManage = (role: string) => {
    switch (role) {
      case 'ADMIN':
        navigate('/admin');
        break;
      case 'STAFF':
        navigate('/nodes');
        break;
      case 'USER':
        navigate('/');
        break;
      default:
        break;
    }
  };

  const handleNavigatePersonal = () => {
    console.log(data);
    navigate(`/personal/${data.sub}`);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpenDropDown((prev) => !prev)}
        className="md:flex hidden items-center gap-3 hover:bg-gray-100 transition px-4 py-2 rounded-[5px] cursor-pointer"
      >
        <img src={data.avatar ? data.avatar : avatar} className="object-contain w-[30px] h-[30px] rounded-full" />
        <p className="font-medium">{data.firstName + ' ' + data.lastName}</p>
      </div>

      {/* dropdown */}
      <AnimatePresence>
        {openDropDown && (
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
              onClick={() => handleNavigateManage(data.role)}
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
  );
};

export default AuthenNav;
