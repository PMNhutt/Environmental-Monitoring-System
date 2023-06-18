import { IntroProps } from 'src/utils/interface';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { reveal } from 'src/utils/animation';

const Intro: React.FC<IntroProps> = (props) => {
  const { position, image, title, description, isEven } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const aniControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      aniControls.start('revealedVariant');
    }
  }, [isInView]);

  return (
    <section ref={ref} className={`${position} gap-10 items-center justify-end w-full`}>
      <motion.div
        variants={reveal}
        initial="hiddenVariant"
        animate={aniControls}
        transition={{ delay: 0.5, duration: 0.5 }}
        className=""
      >
        <img className="sm:h-[500px] object-contain" alt="" src={image} />
      </motion.div>
      <motion.div
        variants={reveal}
        initial="hiddenVariant"
        animate={aniControls}
        transition={{ delay: 1, duration: 0.5 }}
        className="md:w-1/2 w-fit "
      >
        <motion.h2
          variants={reveal}
          initial="hiddenVariant"
          animate={aniControls}
          transition={{ delay: 1.2, duration: 0.5 }}
          className={`${
            isEven ? 'md:text-end' : ''
          } font-extrabold text-t9  bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent`}
        >
          {title}
        </motion.h2>
        <motion.p
          variants={reveal}
          initial="hiddenVariant"
          animate={aniControls}
          transition={{ delay: 1.4, duration: 0.5 }}
          className={`${isEven ? 'md:text-end' : ''} mt-5 text-t5 text-gray-500`}
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Intro;
