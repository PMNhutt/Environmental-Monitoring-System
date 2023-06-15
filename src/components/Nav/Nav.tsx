import { useEffect, useState } from 'react';
import styles from 'src/utils/style';
import { useAppDispatch } from 'src/redux/store/hooks';
import { setCurrentUser } from 'src/redux/slices/authSlice';

// ** components
import Logo from 'src/share/Logo/Logo';
import MobileNav from './components/MobileNav';
import AuthenNav from './components/AuthenNav';

import { motion } from 'framer-motion';
import { animationStart, reveal } from 'src/utils/animation';

import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  let decoded_jwt: any = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const [scroll, setScroll] = useState(false);

  //**  Get shopping cart, set account info
  useEffect(() => {
    if (decoded_jwt) {
      dispatch(setCurrentUser(decoded_jwt));
    }
  }, []);

  // ** Scroll nav
  useEffect(() => {
    const onScroll: EventListener = () => {
      if (win.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const win: Window = window; // <-- DOM-Window, extends DOM-EventTarget
    win.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: animationStart, duration: 0.5 }}>
      <motion.nav
        variants={reveal}
        initial="hiddenVariant"
        animate="revealedVariant"
        transition={{
          ease: 'easeIn',
          type: 'tween',
          staggerChildren: 0.1,
          duration: 0.5,
          delayChildren: animationStart + 0.5,
        }}
        className={`px-5 ${styles.flexCenter} font-poppins w-full flex h-[72px] fixed top-0 bg-transition z-[100] ${
          scroll ? 'drop-shadow-md bg-white' : ''
        }`}
      >
        <div className={`${styles.container} ${styles.flexBetween}`}>
          <motion.div variants={reveal} className="w-[90px]">
            <Logo />
          </motion.div>
          {/* hide desktop */}
          {accessToken ? (
            <AuthenNav data={decoded_jwt} />
          ) : (
            <div className={`md:flex hidden items-center gap-5`}>
              <motion.button
                variants={reveal}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate('/login')}
                className="bg-primary px-5 py-1.5 rounded-full text-white font-medium"
              >
                Login
              </motion.button>
              <motion.button
                variants={reveal}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate('/register')}
                className="border-primary border px-5 py-1.5 rounded-full bg-white text-primary font-medium"
              >
                Register
              </motion.button>
            </div>
          )}
          {/* mobile nav */}
          <div className="md:hidden block">
            <MobileNav />
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Nav;
