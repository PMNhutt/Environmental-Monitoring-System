import React from 'react';
import styles from 'src/utils/style';
import Logo from 'src/share/Logo/Logo';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-bg">
      <div className={`${styles.paddingX} flex justify-center`}>
        <div className={`${styles.container}`}>
          <div className="w-[90px] my-5 cursor-pointer relative z-10" onClick={() => navigate('/')}>
            <Logo />
          </div>
        </div>
      </div>
      <div className="font-poppins">{children}</div>
    </div>
  );
};

export default AuthLayout;
