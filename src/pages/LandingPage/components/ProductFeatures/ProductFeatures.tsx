import styles, { layout } from 'src/utils/style';
import { useRef, useEffect } from 'react';
import defaultValue from 'src/utils/default';

import { motion, useInView, useAnimation } from 'framer-motion';
import { reveal } from 'src/utils/animation';

import Feature from './components/Feature';
import FeatureCard from './components/FeatureCard';
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
        {/* <Feature
          lottieSrc={dataLottie}
          position={layout.section}
          title="Instant Data Mornitoring"
          description={defaultValue.featureInstaneData}
        />
        <Feature
          lottieSrc={notifyLottie}
          position={layout.sectionReverse}
          title="Timely Risk Alerts"
          description={defaultValue.featureTimelyRisk}
          isEven
        />
        <Feature
          lottieSrc={mobileLottie}
          position={layout.section}
          title="Mobile Platform"
          description={defaultValue.featureMobile}
        /> */}

        {/* feature card */}
        <div className="flex sm:flex-row flex-col justify-center gap-20 my-5">
          <FeatureCard
            lottieSrc={dataLottie}
            // position={layout.section}
            title="Instant Data Mornitoring"
            description={defaultValue.cardInstanceData}
            delay={1.2}
          />
          <FeatureCard
            lottieSrc={notifyLottie}
            // position={layout.sectionReverse}
            title="Timely Risk Alerts"
            description={defaultValue.cardTimelyRisk}
            delay={1.6}
          />
          <FeatureCard
            lottieSrc={mobileLottie}
            // position={layout.section}
            title="Mobile Platform"
            description={defaultValue.cardMobile}
            delay={2.2}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
