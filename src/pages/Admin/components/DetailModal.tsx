import { useState } from 'react';
import { Modal } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DetailModalProps } from 'src/utils/interface';
import { Regex_Email, Regex_PhoneNumber } from 'src/utils/regex';

const DetailModal: React.FC<DetailModalProps> = (props) => {
  const { openModal, setOpenModal, title } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [dob, setDob] = useState<any>(null);

  // ** handle submit form
  const onSubmit = (data: any) => {
    const dobFormatted = new Date(data?.dob).toISOString();
    if (data.dob !== null) {
      const requestData = {
        address: data.address,
        dob: dobFormatted,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        phone: data.phone,
      };
      console.log(requestData);
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">{title}</div>
        {/* body */}
        <div className="px-[25px] my-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* first name last name */}
            <div className="flex sm:gap-5 sm:w-[490px] sm:flex-row flex-col w-full">
              <div className="w-full">
                <label className="text-t3 font-semibold text-[#424856]">First name</label>
                <input
                  type="text"
                  className={`block w-full h-[36px] ${
                    errors?.firstname ? 'mb-[5px]' : 'mb-[10px]'
                  } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                  {...register('firstname', {
                    required: true,
                    // pattern: {
                    //   value: Regex_Password,
                    // },
                  })}
                />
                {errors?.firstname?.type === 'required' && (
                  <p className="mb-[5px] text-danger text-[14px]">First name is required</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-t3 font-semibold text-[#424856]">Last name</label>
                <input
                  type="text"
                  className={`block w-full h-[36px] ${
                    errors?.lastname ? 'mb-[5px]' : 'mb-[10px]'
                  } p-[12px] text-t3 bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                  {...register('lastname', {
                    required: true,
                  })}
                />
                {errors?.lastname?.type === 'required' && (
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
              </div>

              {/* date of birth */}
              <div className="w-full">
                <label className="text-t3 font-semibold text-[#424856]">Date of birth</label>
                {/* <input
                  type="text"
                  className={`block w-full h-[36px] ${
                    errors?.dob ? 'mb-[5px]' : 'mb-[10px]'
                  } p-[12px] text-t3 bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                  {...register('dob', {
                    required: true,
                  })}
                />
                {errors?.dob?.type === 'required' && (
                  <p className="mb-[5px] text-danger text-[14px]">Date of birth is required</p>
                )} */}
                <Controller
                  name="dob"
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
                      {errors?.dob?.type === 'required' && (
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
                type="text"
                className={`block w-full h-[36px] ${
                  errors?.email ? 'mb-[5px]' : 'mb-[10px]'
                } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
                {...register('email', {
                  required: true,
                  pattern: Regex_Email,
                })}
              />
              {errors?.email?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">Email is required</p>
              )}
            </>
            {/* password */}
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
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
