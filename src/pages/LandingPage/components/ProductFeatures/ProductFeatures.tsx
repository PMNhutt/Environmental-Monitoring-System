import styles, { layout } from 'src/utils/style';
import { useRef, useEffect } from 'react';

import { motion, useInView, useAnimation } from 'framer-motion';
import { reveal } from 'src/utils/animation';

import Feature from './components/Feature';
import dataLottie from 'src/share/lottie/data-animation.json';
import notifyLottie from 'src/share/lottie/mobile-development.json';
import mobileLottie from 'src/share/lottie/mobile-animation.json';

const ProductFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const aniControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      aniControls.start('revealedVariant');
    }
  }, [isInView]);

  return (
    <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.container}`}>
        {/* header */}
        <div ref={ref} className={` ${styles.flexCenter} flex-col text-center gap-5`}>
          <motion.h2
            variants={reveal}
            initial="hiddenVariant"
            animate={aniControls}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center font-extrabold text-t10 bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent"
          >
            Product Features
          </motion.h2>
          <motion.p
            variants={reveal}
            initial="hiddenVariant"
            animate={aniControls}
            transition={{ delay: 1, duration: 0.5 }}
            className="md:w-[75%] font-medium text-gray-500 text-t6"
          >
            The system offers cost-effective and scalable environmental mornitoring,{' '}
            <span className="text-primary">real-time data</span> display on a mobile platform,{' '}
            <span className="text-primary">proactive alerts</span> for potential risks, and{' '}
            <span className="text-primary">empowers users </span>with actionable environmental information.
          </motion.p>
        </div>
        {/* features */}
        <Feature
          lottieSrc={dataLottie}
          position={layout.section}
          title="Instant Data Mornitoring"
          description="Real-time data mornitoring enables immidiate insights and informed decision making."
        />
        <Feature
          lottieSrc={notifyLottie}
          position={layout.sectionReverse}
          title="Timely Risk Alerts"
          description="Proactive alerts ensure timely response to potential risks."
          isEven
        />
        <Feature
          lottieSrc={mobileLottie}
          position={layout.section}
          title="Mobile Platform"
          description="Convenient mobile platform for instant data access and alerts."
        />
      </div>
    </div>
  );
};

export default ProductFeatures;
