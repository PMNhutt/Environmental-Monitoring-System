import styles, { layout } from 'src/utils/style';
import { useRef, useEffect } from 'react';
import defaultValue from 'src/utils/default';

import Intro from './components/Intro';

// ** assets
import intro1 from 'src/assets/images/intro1.png';
import intro2 from 'src/assets/images/intro2.png';
import intro3 from 'src/assets/images/intro3.png';

// ** lib
import { motion, useInView, useAnimation } from 'framer-motion';
import { reveal } from 'src/utils/animation';

const IntroSection = () => {
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
            Introduction
          </motion.h2>
          <motion.p
            variants={reveal}
            initial="hiddenVariant"
            animate={aniControls}
            transition={{ delay: 1, duration: 0.5 }}
            className="md:w-[75%] font-medium text-gray-500 text-t6"
          >
            {defaultValue.introduction}
          </motion.p>
        </div>
        {/* intro */}
        <Intro
          image={intro1}
          position={layout.section}
          title="Light aspect of orchids"
          description={defaultValue.introCard3}
        />
        <Intro
          image={intro2}
          position={layout.sectionReverse}
          title="Temperature aspect of orchids"
          description={defaultValue.introCard1}
          isEven
        />
        <Intro
          image={intro3}
          position={layout.section}
          title="Humidity aspect of orchids"
          description={defaultValue.introCard2}
        />
      </div>
    </div>
  );
};

export default IntroSection;
