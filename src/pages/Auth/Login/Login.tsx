import Logo from 'src/share/Logo/Logo';
import styles from 'src/utils/style';
import AuthForm from '../AuthForm';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.paddingX} flex justify-center auth-bg`}>
      <div className={`${styles.container}`}>
        <div className="w-[90px] my-5 cursor-pointer relative z-10" onClick={() => navigate('/')}>
          <Logo />
        </div>

        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;