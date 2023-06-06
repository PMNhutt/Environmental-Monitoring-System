import styles from 'src/utils/style';
import VideoBackground from './VideoBackground';
import ImagesBackground from './ImagesBackground';

const HeroSection = () => {
  return (
    <section className="text-center">
      <div className={`${styles.flexCenter} ${styles.paddingX} flex-col gap-10 mb-5`}>
        <div className={`${styles.container} ${styles.flexCenter} flex-col`}>
          <h1 className="font-extrabold font-exo text-[50px] md:text-[60px]">
            <span className="bg-gradient-to-r from-primary-400 to-primary bg-clip-text text-transparent">
              Environmental
            </span>{' '}
            Monitoring System
          </h1>
          <h2 className="lg:w-1/2 md:w-1/2 leading-relaxed text-center font-medium text-lg text-color-2-900">
            Experience cost-effective and efficient environmental mornitoring with our advanced system, empowering you
            to analyze real-time data for sustainalbe living
          </h2>
        </div>
      </div>
      <button className="py-2 px-10 border-primary border hover:text-white hover:bg-primary transition rounded-full text-primary text-xl font-medium mb-[40px] mt-[10px]">
        Join us
      </button>
      <ImagesBackground />
      <VideoBackground />
    </section>
  );
};

export default HeroSection;
