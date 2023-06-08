import menu from 'src/assets/images/menu.svg';
import closeMenu from 'src/assets/images/Close.svg';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button onClick={() => setOpen((prev) => !prev)} className="p-1 rounded-full">
        <img src={!open ? menu : closeMenu} className="object-contain w-[50px]" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            exit={{ x: '100%', opacity: 0 }}
            className="absolute top-15 right-0 bg-gradient-to-tr from-primary-400 to-primary p-4 rounded-[10px] drop-shadow-sm text-white font-semibold text-center"
          >
            <button onClick={() => navigate('/login')} className="py-3 px-5">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="py-3 px-5">
              Register
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
