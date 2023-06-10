import Logo from '../Logo/Logo';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-[100vh] flex items-center justify-center"
      >
        <div className="w-[100px] animate-bounce">
          <Logo />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
