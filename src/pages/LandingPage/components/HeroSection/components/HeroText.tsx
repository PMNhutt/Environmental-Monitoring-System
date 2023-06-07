import styles from 'src/utils/style';
import { motion } from 'framer-motion';
import { animationStart, reveal } from 'src/utils/animation';

const HeroText = () => {
  return (
    <div className={`h-auto md:w-1/2 flex-col bg-transparent`}>
      <div className={`flex flex-col gap-5 mb-5`}>
        <motion.h1
          variants={reveal}
          initial="hiddenVariant"
          animate="revealedVariant"
          transition={{ delay: animationStart + 1, duration: 0.5 }}
          className="font-extrabold font-exo text-[50px] md:text-[65px]"
        >
          <span className="bg-gradient-to-r from-primary-400 to-primary bg-clip-text text-transparent">
            Environmental
          </span>{' '}
          <span className="bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent">
            Monitoring System
          </span>
        </motion.h1>
        <motion.h2
          variants={reveal}
          initial="hiddenVariant"
          animate="revealedVariant"
          transition={{ delay: animationStart + 1.2, duration: 0.5 }}
          className="leading-relaxed  font-medium text-t6 text-gray-500"
        >
          Experience cost-effective and efficient environmental mornitoring with our advanced system, empowering you to
          analyze real-time data for sustainalbe living
        </motion.h2>
        <motion.button
          variants={reveal}
          initial="hiddenVariant"
          animate="revealedVariant"
          transition={{ delay: animationStart + 1.4, duration: 0.5 }}
          className="py-2 w-fit px-10 border-primary border bg-white rounded-full text-primary text-xl font-medium mb-[40px] mt-[20px]"
        >
          Join us
        </motion.button>
      </div>
    </div>
  );
};

export default HeroText;
