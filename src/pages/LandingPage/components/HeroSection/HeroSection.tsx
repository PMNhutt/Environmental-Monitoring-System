import VideoBackground from './components/VideoBackground';
import styles from 'src/utils/style';
import HeroText from './components/HeroText';

const HeroSection = () => {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   const handler = setTimeout(() => {
  //     document.body.style.overflow = 'auto';
  //   }, 4000);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, []);

  return (
    <div className={`${styles.flexCenter} ${styles.paddingX}`}>
      <div className={`${styles.container} flex md:flex-row flex-col items-center md:gap-10 mt-[100px]`}>
        <HeroText />
        <VideoBackground />
      </div>
    </div>
  );
};

export default HeroSection;
