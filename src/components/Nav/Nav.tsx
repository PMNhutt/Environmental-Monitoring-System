import Logo from 'src/share/Logo/Logo';
import styles from 'src/utils/style';

const Nav = () => {
  return (
    <nav className={`px-5 ${styles.flexCenter} w-full flex h-[72px] fixed top-0 bg-white z-100`}>
      <div className={`${styles.container} ${styles.flexBetween}`}>
        <Logo />
        <p className="text-black">Alo</p>
      </div>
    </nav>
  );
};

export default Nav;
