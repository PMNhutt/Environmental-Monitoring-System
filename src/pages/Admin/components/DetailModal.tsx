import { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useAppSelector } from 'src/redux/store/hooks';
import { useAppDispatch } from 'src/redux/store/hooks';
import { createUser, editUser } from 'src/redux/slices/usersSlice';

import { DetailModalProps } from 'src/utils/interface';
import { Regex_Email, Regex_PhoneNumber } from 'src/utils/regex';

interface FormProps {
  userDetail: any;
  isModalDetail: boolean;
  setOpenModal: any;
  setUpdateData: any;
}

const Form: React.FC<FormProps> = (props) => {
  const { userDetail, isModalDetail, setOpenModal, setUpdateData } = props;
  const [dob, setDob] = useState<any>(userDetail.userDetail && dayjs(userDetail.userDetail?.dateOfBirth));
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: userDetail.userDetail,
  });

  // ** handle submit form
  const onSubmit = (data: any) => {
    const dobFormatted = dayjs(data?.dateOfBirth).format();
    const requestCreateUser = {
      address: data.address,
      dateOfBirth: dobFormatted,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phone,
    };
    const requestEditUser = {
      id: userDetail.userDetail?.id,
      address: data.address,
      dateOfBirth: dobFormatted,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };

    if (isModalDetail) {
      // console.log(userDetail.userDetail.id);
      dispatch(editUser(requestEditUser)).then(() => {
        setOpenModal(false);
        setUpdateData((prev: boolean) => !prev);
      });
    } else {
      // console.log(requestCreateUser);
      dispatch(createUser(requestCreateUser)).then(() => {
        setOpenModal(false);
        setUpdateData((prev: boolean) => !prev);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* first name last name */}
      <div className="flex sm:gap-5 sm:w-[490px] sm:flex-row flex-col w-full">
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">First name</label>
          <input
            type="text"
            className={`block w-full h-[36px] ${
              errors?.firstName ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('firstName', {
              required: true,
              // pattern: {
              //   value: Regex_Password,
              // },
            })}
          />
          {errors?.firstName?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">First name is required</p>
          )}
        </div>

        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Last name</label>
          <input
            type="text"
            className={`block w-full h-[36px] ${
              errors?.lastName ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('lastName', {
              required: true,
            })}
          />
          {errors?.lastName?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Last name is required</p>
          )}
        </div>
      </div>
      {/* address */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Address</label>
        <input
          type="text"
          className={`block w-full h-[36px] ${
            errors?.address ? 'mb-[5px]' : 'mb-[10px]'
          } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('address', {
            required: true,
            // pattern: {
            //   value: Regex_Password,
            // },
          })}
        />
        {errors?.address?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Address is required</p>
        )}
      </>
      {/* phone, DoB */}
      <div className="flex sm:gap-5 sm:w-[490px] sm:flex-row flex-col w-full">
        {/* phone */}
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Phone</label>
          <input
            type="number"
            className={`block w-full h-[36px] ${
              errors?.phone ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('phone', {
              required: true,
              pattern: Regex_PhoneNumber,
            })}
          />
          {errors?.phone?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Phone number is required</p>
          )}
          {errors?.phone?.type === 'pattern' && (
            <p className="mb-[5px] text-danger text-[14px]">Phone number not valid</p>
          )}
        </div>

        {/* date of birth */}
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Date of birth</label>
          <Controller
            name="dateOfBirth"
            rules={{ required: true }}
            defaultValue={dob}
            control={control}
            render={({ field: { onChange, ...restField } }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...restField}
                    value={dob}
                    onChange={(event) => {
                      onChange(event);
                      setDob(event);
                    }}
                    disableFuture
                    format="DD-MM-YYYY"
                    sx={{
                      height: '36px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiInputBase-inputAdornedEnd': {
                        padding: '6px 14px',
                        fontSize: '14px',
                      },
                    }}
                    className="block w-full h-[36px] p-[12px] text-t3 bg-[#F3F4F6] rounded-[5px] focus:outline-primary outline-none border-none"
                  />
                </LocalizationProvider>
                {errors?.dateOfBirth?.type === 'required' && (
                  //if you want to show an error message
                  <p className="mb-[5px] text-danger text-[14px]">Date of birth is required</p>
                )}
              </>
            )}
          />
        </div>
      </div>
      {/* email */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Email</label>
        <input
          disabled={isModalDetail}
          type="text"
          className={`${isModalDetail ? 'cursor-not-allowed' : ''} block w-full h-[36px] ${
            errors?.email ? 'mb-[5px]' : 'mb-[10px]'
          } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('email', {
            required: true,
            pattern: Regex_Email,
          })}
        />
        {errors?.email?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Email is required</p>}
      </>
      {/* password */}
      {!isModalDetail && (
        <>
          <label className="text-t3 font-semibold text-[#424856]">Password</label>
          <input
            type="password"
            className={`block w-full h-[36px] ${
              errors?.password ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('password', {
              required: true,
              // pattern: Regex_Email,
            })}
          />
          {errors?.password?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Password is required</p>
          )}
        </>
      )}

      {/* buttons */}
      <div className="flex justify-end items-center gap-4 mt-10">
        <button
          onClick={() => setOpenModal(false)}
          className="border-primary border text-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
        >
          Cancel
        </button>
        <button type="submit" className=" text-white bg-primary text-t3 font-medium px-5 py-1 rounded-[6px]">
          Save
        </button>
      </div>
    </form>
  );
};

const DetailModal: React.FC<DetailModalProps> = (props) => {
  const { openModal, setOpenModal, title, isModalDetail, setUpdateData } = props;
  const userDetail = useAppSelector((state) => state.users);

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">
          {!userDetail.loading && title}
        </div>
        {/* body */}
        <div className="px-[25px] my-3">
          {!userDetail.loading ? (
            <Form
              isModalDetail={isModalDetail}
              userDetail={userDetail}
              setOpenModal={setOpenModal}
              setUpdateData={setUpdateData}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
