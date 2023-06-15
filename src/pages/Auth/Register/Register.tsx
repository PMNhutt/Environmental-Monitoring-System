import { useEffect } from 'react';
import styles from 'src/utils/style';
import AuthForm from '../AuthForm';

const Register: React.FC<{ title: string }> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className={`${styles.paddingX} flex justify-center`}>
      <div className={`${styles.container}`}>
        <div className="sm:absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};

export default Register;
