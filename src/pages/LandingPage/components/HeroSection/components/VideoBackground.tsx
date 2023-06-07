import { motion } from 'framer-motion';
import { reveal } from 'src/utils/animation';
const VideoBackground = () => {
  return (
    <motion.video
      variants={reveal}
      initial="hiddenVariant"
      animate="revealedVariant"
      transition={{ duration: 1, delay: 1 }}
      className="lg:h-[600px] h-[400px] md:w-1/2 object-cover blob float"
      autoPlay
      muted
      loop
    >
      <source src="src/assets/videos/home.mp4" type="video/mp4" />
    </motion.video>
  );
};

export default VideoBackground;
