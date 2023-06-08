import styles from 'src/utils/style';
import decor from 'src/assets/images/Saly-16.png';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { reveal } from 'src/utils/animation';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const aniControls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInView) {
      aniControls.start('revealedVariant');
    }
  }, [isInView]);

  return (
    <section className={`${styles.paddingX} ${styles.marginY} ${styles.flexCenter}`}>
      <motion.div
        variants={reveal}
        initial="hiddenVariant"
        animate={aniControls}
        transition={{ delay: 0.5, duration: 0.5 }}
        ref={ref}
        className={`${styles.container} p-16 rounded-3xl bg-gradient-to-tr from-primary-400 to-primary relative`}
      >
        <div className="relative z-[1]">
          <div>
            <motion.h2
              variants={reveal}
              initial="hiddenVariant"
              animate={aniControls}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-white text-t9 font-bold"
            >
              Let's get started!
            </motion.h2>
            <motion.p
              variants={reveal}
              initial="hiddenVariant"
              animate={aniControls}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-white font-semibold mt-5 md:w-2/3"
            >
              Start experience the transformative benefits of real-time environmental mornitoring, empowering you to
              safeguard your health and well-being with actionable insihts.
            </motion.p>
          </div>
          <motion.button
            variants={reveal}
            initial="hiddenVariant"
            animate={aniControls}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => navigate('/login')}
            className="mt-8 bg-gradient-to-tr from-gray-300 to-white px-5 py-3 rounded-[10px] font-semibold text-gray-600"
          >
            Contact Us
          </motion.button>
        </div>
        <motion.div
          variants={reveal}
          initial="hiddenVariant"
          animate={aniControls}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-[350px] absolute right-0 bottom-[-5px] -z-[0.5]"
        >
          <img src={decor} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
