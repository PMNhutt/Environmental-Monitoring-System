import Logo from 'src/share/Logo/Logo';
import styles from 'src/utils/style';
import { useState } from 'react';

// ** lib
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ** assets
import avatar from 'src/assets/images/avatar.svg';
import dropDown from 'src/assets/images/drop_down.svg';
import logout from 'src/assets/images/Logout.svg';

const SystemNav = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className={`${styles.flexCenter} px-5 w-full h-[72px] fixed top-0 bg-white z-[100] border-b-gray-200 border-b font-poppins`}
    >
      <div className={`${styles.container} ${styles.flexBetween} flex justify-between `}>
        <div onClick={() => navigate('/')} className="w-[90px] cursor-pointer">
          <Logo />
        </div>

        <div className="relative">
          <div
            onClick={() => setOpenDropDown((prev) => !prev)}
            className="pl-4 py-3 flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-[30px] h-[30px]">
              <img src={avatar} className="w-full object-contain" />
            </div>

            <div className="flex items-center gap-2 ">
              <p className="font-medium text-t3 text-[#565D6D]">Thinh Dinh</p>
              <img
                src={dropDown}
                className={`w-[10px] h-[5px] object-contain transform ${openDropDown ? 'rotate-180' : ''} `}
              />
            </div>
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
                <li className="flex items-center gap-3 px-5 py-3 cursor-pointer transition hover:bg-gray-100 rounded-tr-[10px] rounded-tl-[10px]">
                  <img src={avatar} className="w-[24px] h-[24px] object-contain" />
                  <p className="text-t3">Personal Information</p>
                </li>
                <li className="flex items-center gap-3 cursor-pointer px-5 py-3 transition hover:bg-gray-100 rounded-br-[10px] rounded-bl-[10px]">
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
