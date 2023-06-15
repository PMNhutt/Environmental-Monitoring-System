// ** components
import EditInfoPlaceholder from './components/EditInfoPlaceholder';
import EditInfoForm from './components/EditInfoForm';

// ** redux
import { useAppSelector } from 'src/redux/store/hooks';

// ** libs

const ProfileInfo = () => {
  const loading = useAppSelector((state) => state.users.getUserLoading);

  return (
    <div className="xl:w-[832px] h-fit px-7 py-10 w-full bg-white rounded-[6px] border border-[#DEE1E6]">
      {loading ? <EditInfoPlaceholder /> : <EditInfoForm />}
    </div>
  );
};

export default ProfileInfo;
