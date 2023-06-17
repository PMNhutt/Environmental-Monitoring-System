import styles from 'src/utils/style';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ** redux
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import { getUserById } from 'src/redux/slices/usersSlice';

// ** components
import ProfileAva from './components/ProfileAva/ProfileAva';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [dataValid, setDataValid] = useState(false);
  const loading = useAppSelector((state) => state.users.getUserLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(getUserById(params.id)).then((res: any) => {
        if (res.payload) {
          setDataValid(true);
        } else {
          setDataValid(false);
        }
      });
    }
  }, [params.id]);

  return (
    <div className={`${styles.flexCenter} ${styles.paddingX} font-poppins w-full`}>
      <div className={`${styles.container} 2xl:px-20`}>
        {!loading ? (
          dataValid ? (
            <div className="flex gap-[30px] justify-center xl:flex-row flex-col my-16">
              <ProfileAva />
              <ProfileInfo />
            </div>
          ) : (
            <p className="text-center text-t4 text-black my-5">User not found...</p>
          )
        ) : (
          <p className="text-center text-t4 text-black my-5">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
