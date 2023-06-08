/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Regex_Email, Regex_Password } from 'src/utils/regex';

// ** assets
import eye_gray from 'src/assets/images/ic_eye_gray.svg';
import eye_closed from 'src/assets/images/ic_eye_closed.svg';

const AuthForm = () => {
  //** Const */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  // const notifyError = (err: string) =>
  //   toast.error(err, {
  //     pauseOnHover: false,
  //   });

  // ** toggle show password
  // ** Funct
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  // ** handle submit form
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-[10px] p-5">
      {/* title */}
      <p className="py-5 text-t6 font-medium text-black">Log in</p>

      {/* inputs */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          className={`block sm:w-[490px] w-full h-[47px] ${
            errors?.email ? 'mb-[5px]' : 'mb-[20px]'
          } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
          {...register('email', {
            required: true,
            pattern: Regex_Email,
          })}
        />
        {errors?.email?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Email is required</p>}
        {errors?.email?.type === 'pattern' && <p className="mb-[5px] text-danger text-[14px]">Email not valid</p>}

        <div className="relative">
          <input
            type={passwordShown ? 'text' : 'password'}
            placeholder="Password"
            className={`block sm:w-[490px] w-full h-[47px] ${
              errors?.password ? 'mb-[5px]' : 'mb-[15px]'
            } p-[12px] text-subText sm:text-md  border border-[#B9B9B9] rounded-[5px] focus:outline-primary`}
            {...register('password', {
              required: true,
              pattern: Regex_Password,
            })}
          />
          <div
            onClick={() => togglePasswordVisiblity()}
            className="w-[26px] h-[26px] bg-cover cursor-pointer absolute right-[10px] bottom-[10px]"
            style={{ backgroundImage: `url(${passwordShown ? eye_gray : eye_closed})` }}
          />
        </div>
        {errors?.password?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Password is required</p>
        )}
        {errors?.password?.type === 'pattern' && (
          <p className="mb-[5px] text-danger text-[14px]">Mật khẩu không hợp lệ</p>
        )}

        <p
          onClick={() => navigate('/forgot-password')}
          className="text-end text-[15px] cursor-pointer font-medium text-primary"
        >
          Forgot password?
        </p>
        {/* buttons */}
        <button type="submit" className="w-full mt-10 mb-20 bg-primary text-white font-medium py-2 rounded-[8px]">
          Log in
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
