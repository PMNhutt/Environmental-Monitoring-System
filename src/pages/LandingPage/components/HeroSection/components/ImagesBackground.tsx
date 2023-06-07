import { motion } from 'framer-motion';
import { animationStart } from 'src/utils/animation';

const ImagesBackground = () => {
  return (
    <div className="sm:flex hidden absolute w-full justify-between transform -translate-y-[200px] -z-[1] overflow-hidden">
      <motion.img
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: animationStart + 1.2,
          type: 'tween',
          duration: 0.5,
        }}
        src="src/assets/images/map_1.png"
        className="object-cover"
      />
      <motion.img
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: animationStart + 1.2,
          type: 'tween',
          duration: 0.5,
        }}
        src="src/assets/images/map_2.png"
        className="object-cover"
      />
    </div>
  );
};

export default ImagesBackground;
