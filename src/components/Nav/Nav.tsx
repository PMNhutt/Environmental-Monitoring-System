import { useEffect, useState } from 'react';
import Logo from 'src/share/Logo/Logo';
import styles from 'src/utils/style';

import { motion } from 'framer-motion';
import { animationStart, reveal } from 'src/utils/animation';

const Nav = () => {
  const [scroll, setScroll] = useState(false);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.nav
        variants={reveal}
        initial="hiddenVariant"
        animate="revealedVariant"
        transition={{
          ease: 'easeIn',
          type: 'tween',
          staggerChildren: 0.1,
          duration: 0.5,
          delayChildren: 0.5,
        }}
        className={`px-5 ${
          styles.flexCenter
        } drop-shadow-md font-poppins w-full flex h-[72px] fixed top-0 bg-transition z-[100] ${
          scroll ? 'drop-shadow-md bg-white' : ''
        }`}
      >
        <div className={`${styles.container} ${styles.flexBetween}`}>
          <motion.div variants={reveal}>
            <Logo />
          </motion.div>
          <div className={`flex items-center gap-5`}>
            <motion.button
              variants={reveal}
              whileHover={{ scale: 1.1 }}
              className="bg-primary px-5 py-1.5 rounded-full text-white font-medium"
            >
              Login
            </motion.button>
            <motion.button
              variants={reveal}
              whileHover={{ scale: 1.1 }}
              className="border-primary border px-5 py-1.5 rounded-full bg-white text-primary font-medium"
            >
              Register
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Nav;
