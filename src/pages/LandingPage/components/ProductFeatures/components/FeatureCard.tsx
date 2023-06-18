import Lottie from 'lottie-react';
import { FeatureCardProps } from 'src/utils/interface';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { reveal } from 'src/utils/animation';

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { lottieSrc, title, description, delay } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const aniControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      aniControls.start('revealedVariant');
    }
  }, [isInView]);

  return (
    <div ref={ref} className="py-10 md:w-1/3 w-full">
      <motion.div
        variants={reveal}
        initial="hiddenVariant"
        animate={aniControls}
        transition={{ delay: delay, duration: 0.2 }}
        className=""
      >
        <Lottie animationData={lottieSrc} loop={true} controls={false} className="h-[300px]" />
      </motion.div>
      <motion.p
        variants={reveal}
        initial="hiddenVariant"
        animate={aniControls}
        transition={{ delay: delay + 0.2, duration: 0.2 }}
        className="font-extrabold text-t7 bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent"
      >
        {title}
      </motion.p>
      <motion.p
        variants={reveal}
        initial="hiddenVariant"
        animate={aniControls}
        transition={{ delay: delay + 0.4, duration: 0.2 }}
        className="mt-5 text-t4 text-gray-500 text-start"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default FeatureCard;
