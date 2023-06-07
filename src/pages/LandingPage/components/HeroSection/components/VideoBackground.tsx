import { motion } from 'framer-motion';
import { animationStart, reveal } from 'src/utils/animation';

const VideoBackground = () => {
  return (
    <motion.video
      variants={reveal}
      initial="hiddenVariant"
      animate="revealedVariant"
      transition={{ duration: 1, delay: animationStart + 1.5 }}
      className="lg:h-[600px] h-[400px] md:w-1/2 object-cover blob float"
      autoPlay
      muted
      loop
    >
      <source src={import.meta.env.VITE_HOME_VIDEO} type="video/mp4" />
    </motion.video>
  );
};

export default VideoBackground;
