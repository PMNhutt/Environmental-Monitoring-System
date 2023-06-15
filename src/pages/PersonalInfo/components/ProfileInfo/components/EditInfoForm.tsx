import { useState } from 'react';
import UpdatePassModal from './UpdatePassModal';

// ** assets
import spinner from 'src/assets/images/spinner.svg';

// ** redux
import { useAppSelector } from 'src/redux/store/hooks';
import { useAppDispatch } from 'src/redux/store/hooks';

// ** libs
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { editUser, getUserById } from 'src/redux/slices/usersSlice';
import { Regex_PhoneNumber } from 'src/utils/regex';

const EditInfoForm = () => {
  const userData = useAppSelector((state) => state.users.userDetailById);
  const loading = useAppSelector((state) => state.users.updating);

  const [dob, setDob] = useState<any>(userData && dayjs(userData.dateOfBirth));
  const [checked, setChecked] = useState(true);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: userData,
  });

  // ** handle check checkbox
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // ** handle submit form
  const onSubmit = (data: any) => {
    const dobFormatted = dayjs(data?.dateOfBirth).format();
    const requestEditUser = {
      id: userData?.id,
      address: data.address,
      dateOfBirth: dobFormatted,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };
    dispatch(editUser(requestEditUser)).then(() => {
      dispatch(getUserById(userData?.id));
    });
  };

  return (
    <>
      {openUpdateModal && (
        <UpdatePassModal openModal={openUpdateModal} setOpenModal={setOpenUpdateModal} email={userData?.email} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-black text-t8 font-medium mb-4">Profile</p>

        {/* first name last name */}
        <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
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
            placeholder="Your Address"
            className={`block w-full h-[36px] ${
              errors?.address ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('address', {
              required: false,
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
        <div className="flex sm:gap-5 sm:flex-row flex-col w-full">
          {/* phone */}
          <div className="w-full">
            <label className="text-t3 font-semibold text-[#424856]">Phone</label>
            <input
              type="number"
              placeholder="Your phone number"
              className={`block w-full h-[36px] ${
                errors?.phone ? 'mb-[5px]' : 'mb-[10px]'
              } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
              {...register('phone', {
                required: false,
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
              rules={{ required: false }}
              defaultValue={dob}
              control={control}
              render={({ field: { onChange, ...restField } }) => (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...restField}
                      slotProps={{
                        textField: {
                          disabled: true,
                        },
                      }}
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
        {/* account */}
        <div className="py-3 border-t border-t-[#D9D9D9] mt-5">
          <p className="text-black text-t8 font-medium ">Account</p>
          <div className="w-full flex justify-end">
            <p onClick={() => setOpenUpdateModal(true)} className="text-primary text-t2 font-medium cursor-pointer">
              Update password
            </p>
          </div>

          <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">Email</label>
              <input
                disabled
                type="text"
                className={`block w-full h-[36px]
              mb-[10px] p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] 
              rounded-[5px] focus:outline-primary`}
                {...register('email', {
                  // required: true,
                  // pattern: Regex_Email,
                })}
              />
            </div>

            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">Password</label>
              <input
                disabled
                type="password"
                value={12345679}
                className={`block w-full h-[36px] mb-[10px] p-[12px] text-t3
              bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
              />
            </div>
          </div>
        </div>
        {/* options */}
        <div className="py-3 border-t border-t-[#D9D9D9] mt-5">
          <p className="text-black text-t8 font-medium mb-4">Options</p>

          <div className="flex gap-1 items-start">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              sx={{
                color: '#535CE8',
                '&.Mui-checked': {
                  color: '#535CE8',
                },
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />

            <div>
              <p className="text-black text-t3 font-medium">Receive email notifications</p>
              <p className="text-[#9095A1] text-t2 font-medium">
                We will send email if there is high risk data is coming from LoRa networks to you
              </p>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-end items-center gap-4 mt-10">
          {/* <button type="submit" className=" text-white bg-primary text-t3 font-medium px-6 py-3 rounded-[6px]">
          Save information
        </button> */}
          <button
            disabled={loading}
            type="submit"
            className={`${
              loading ? 'cursor-not-allowed bg-primary-400' : 'bg-primary'
            } flex items-center justify-center gap-3 md:w-fit w-full text-t3 text-white font-medium px-6 py-3 rounded-[6px] transition hover:scale-[1.01] duration-150`}
          >
            {loading && <img src={spinner} className="animate-spin h-5 w-5" />}
            {loading ? 'Processing...' : 'Save information'}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditInfoForm;
