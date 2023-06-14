import { useAppSelector } from 'src/redux/store/hooks';
import { useState, useEffect } from 'react';

// ** assets
import avatar from 'src/assets/images/avatar.svg';
import edit from 'src/assets/images/EditIcon.svg';
import copy from 'src/assets/images/Copyclip.svg';
import spinner from 'src/assets/images/spinner.svg';

// ** libs
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';

// ** redux
import { useAppDispatch } from 'src/redux/store/hooks';
import { changeUserAvatar, getUserById } from 'src/redux/slices/usersSlice';

// ** Firebase
import { storage } from 'src/utils/plugins/firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

const ProfileAva = () => {
  const userData = useAppSelector((state) => state.users.userDetailById);
  const dispatch = useAppDispatch();
  const [uploading, setUploading] = useState<any>();

  const notifySuccess = (mess: string) =>
    toast.success(mess, {
      pauseOnHover: false,
      position: 'top-center',
    });
  const notifyError = (mess: string) =>
    toast.error(mess, {
      pauseOnHover: false,
      position: 'top-center',
    });

  // ** check valid images
  const handleSelectAvatar = (avatar: any) => {
    let validImage = true;
    // check file size and type
    if (!avatar.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      // avatar.target.value = null;
      validImage = false;
      notifyError('Invalid type of image. Please select valid image (.jpg,.png,.jpeg)');
      return;
    }

    if (avatar.size >= 2621440) {
      // file.target.value = null;
      validImage = false;
      notifyError(`Size too large (${Math.round(avatar.size / 1000000)} MB). Limit size is (2.5 MB)`);
      return;
    }
    if (validImage) {
      // setSelectAvatar(avatar);
      console.log(avatar);
      //create folder and image name
      const imageRef = ref(
        storage,
        `avatar/${userData?.firstName + ' ' + userData?.lastName}/${avatar.name + crypto.randomUUID()}`,
      );
      setUploading(true);

      //upload image
      uploadBytes(imageRef, avatar).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setSelectAvatar(url);
          // console.log(url);
          dispatch(changeUserAvatar({ id: userData?.id, avatar: url })).then(() => {
            dispatch(getUserById(userData?.id));
          });
          setUploading(false);
        });
      });
    }
  };

  return (
    <div className="xl:w-[312px] h-fit w-full px-7 py-10 rounded-[8px] bg-white border border-[#DEE1E6] flex flex-col justify-center items-center">
      {/* avatar */}
      <div className="relative">
        {uploading ? (
          <div className="rounded-full w-[140px] h-[140px] bg-gray-50 text-t3 text-gray-500 flex gap-2 justify-center items-center">
            <img src={spinner} className="animate-spin h-5 w-5" />
            Uploading...
          </div>
        ) : (
          <img
            src={userData?.avatar ? userData.avatar : avatar}
            className="object-cover rounded-full w-[140px] h-[140px]"
          />
        )}
        {/* edit button */}
        <Tooltip title="Change avatar" placement="top">
          <label
            htmlFor="avatar"
            className={`${
              uploading ? 'cursor-not-allowed' : 'cursor-pointer'
            } absolute bottom-0 right-0 bg-primary border border-white rounded-full w-7 h-7 flex justify-center items-center`}
          >
            <img src={edit} className="object-cover w-[12px] h-[12px]" />
            <input
              disabled={uploading}
              name="avatar"
              id="avatar"
              style={{ display: 'none' }}
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={(e: any) => {
                handleSelectAvatar(e.target.files[0]);
              }}
            />
          </label>
        </Tooltip>
      </div>
      {/* name... */}
      <p className="mt-4 text-primary font-semibold text-t6 line-clamp-1">
        {userData?.firstName + ' ' + userData?.lastName}
      </p>
      {/* role */}
      <p className="font-semibold text-t3 text-black capitalize ">{userData?.role.toLowerCase()}</p>
      {/* short description */}
      <p className="mt-4 text-center text-t3 text-[#9095A1]">{`I'm Administrator of this website Also developer`}</p>
      {/* fb link */}
      <div className="py-2 border-t border-t-[#D9D9D9] mt-3 w-full">
        <p className="text-[#424856] text-t3 font-semibold">Facebook Link</p>
        <div className="bg-[#F3F4F6] w-full px-[10px] py-[7px] rounded-[6px] flex items-center justify-between gap-7">
          <p className="text-t3 line-clamp-1">https://facebook.com/thinhdinh</p>
          <Tooltip title="Copy to clipboard" placement="top">
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://facebook.com/thinhdinh');
                notifySuccess('Copied!');
              }}
            >
              <img src={copy} className="object-contain w-[14px] h-[14px]" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProfileAva;
