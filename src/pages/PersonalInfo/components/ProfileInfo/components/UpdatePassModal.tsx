import React, { useState } from 'react';
import { Modal } from '@mui/material';

// ** redux
import { useAppDispatch } from 'src/redux/store/hooks';
import { updatePassword } from 'src/redux/slices/usersSlice';

// ** libs
import { useForm } from 'react-hook-form';

interface ModalProps {
  email: string | undefined;
  setOpenModal: any;
  openModal: any;
}

const UpdatePassModal: React.FC<ModalProps> = (props) => {
  const { email, setOpenModal, openModal } = props;
  const dispatch = useAppDispatch();
  const [confirmPassError, setConfirmPassError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ** handle submit form
  const onSubmit = (data: any) => {
    const reqData = {
      email: email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    if (data.newPassword === data.confirmNewPass) {
      setConfirmPassError(false);
      dispatch(updatePassword(reqData)).then(() => {
        setOpenModal(false);
      });
    } else {
      setConfirmPassError(true);
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">Update password</div>
        {/* body */}
        <div className="px-[25px] my-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* old password */}
            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">Current password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className={`block w-full h-[36px] ${
                  errors?.oldPassword ? 'mb-[5px]' : 'mb-[10px]'
                } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                {...register('oldPassword', {
                  required: true,
                  // pattern: Regex_Email,
                })}
              />
              {errors?.oldPassword?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">Current password is required</p>
              )}
            </div>
            {/* new password */}
            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">New password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className={`block w-full h-[36px] ${
                  errors?.newPassword ? 'mb-[5px]' : 'mb-[10px]'
                } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                {...register('newPassword', {
                  required: true,
                  // pattern: Regex_Email,
                })}
              />
              {errors?.newPassword?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">New password is required</p>
              )}
            </div>
            {/* confirm password */}
            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">Confirm new password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className={`block w-full h-[36px] ${
                  errors?.confirmNewPass ? 'mb-[5px]' : 'mb-[10px]'
                } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                {...register('confirmNewPass', {
                  required: true,
                  // pattern: Regex_Email,
                })}
              />
              {errors?.confirmNewPass?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">Confirm new password is required</p>
              )}
              {confirmPassError && <p className="mb-[5px] text-danger text-[14px]">Password not match</p>}
            </div>

            {/* buttons */}
            <div className="flex justify-end items-center gap-4 mt-10">
              <button
                onClick={() => setOpenModal(false)}
                className="border-primary border text-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
              >
                Cancel
              </button>
              <button type="submit" className=" text-white bg-primary text-t3 font-medium px-5 py-1 rounded-[6px]">
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePassModal;
