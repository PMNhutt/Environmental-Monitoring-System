import styles from 'src/utils/style';
import Logo from 'src/share/Logo/Logo';

const Footer = () => {
  return (
    <footer className={`${styles.flexCenter} ${styles.paddingX} flex-col font-poppins`}>
      <div className={`${styles.container} ${styles.paddingY}`}>
        <div className="mb-8">
          <div className="w-[90px]">
            <Logo />
          </div>
          <p className="mt-5 text-t5 md:w-[40%] font-medium">
            Experience cost-effective and efficient environmental mornitoring with our advanced system
          </p>
        </div>

        <div className="w-full flex items-center justify-center md:flex-row flex-col pt-6 border-t-[1px] border-t-gray-300">
          <p className="font-normal text-center leading-[27px]">
            {new Date().getFullYear()} Envi. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
