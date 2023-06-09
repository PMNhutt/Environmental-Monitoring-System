import styles from 'src/utils/style';

// ** components
import Header from './components/Header/Header';

const UserManagement = () => {
  return (
    <div className={`${styles.flexCenter} ${styles.paddingX}`}>
      <div className={`${styles.container}`}>
        {/* header */}
        <div className="my-10">
          <Header />
        </div>
        {/* data table */}
      </div>
    </div>
  );
};

export default UserManagement;
