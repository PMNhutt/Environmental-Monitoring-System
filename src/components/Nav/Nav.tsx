import { useEffect, useState } from 'react';
import Logo from 'src/share/Logo/Logo';
import styles from 'src/utils/style';

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  // ** Scroll nav
  useEffect(() => {
    const onScroll: EventListener = () => {
      if (win.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const win: Window = window; // <-- DOM-Window, extends DOM-EventTarget
    win.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`px-5 ${styles.flexCenter} font-poppins w-full flex h-[72px] fixed top-0 bg-white z-100 ${
        scroll ? 'drop-shadow-md' : ''
      }`}
    >
      <div className={`${styles.container} ${styles.flexBetween}`}>
        <Logo />
        <div className={`flex items-center gap-5`}>
          <button className="bg-primary px-5 py-1.5 rounded-full text-white font-medium hover:-translate-y-0.5 transition">
            Login
          </button>
          <button className="border-primary border px-5 py-1.5 rounded-full text-primary font-medium hover:-translate-y-0.5 transition">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
