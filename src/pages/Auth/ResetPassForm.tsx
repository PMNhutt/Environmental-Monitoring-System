/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Regex_Email, Regex_Password } from 'src/utils/regex';

// ** redux
import { resetPass, forgotPass } from 'src/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';

// ** assets
import eye_gray from 'src/assets/images/ic_eye_gray.svg';
import eye_closed from 'src/assets/images/ic_eye_closed.svg';
import ic_email from 'src/assets/images/email_form.svg';
import ic_password from 'src/assets/images/password_form.svg';
import spinner from 'src/assets/images/spinner.svg';

const ResetPassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const forgotPassStore = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordRepShown, setPasswordRepShown] = useState(false);
  const [checkMatchPass, setCheckMatchPass] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailSent, setEmailSent] = useState();

  // ** toggle show password
  // ** Funct
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  const togglePasswordRepVisiblity = () => {
    setPasswordRepShown((prev) => !prev);
  };

  const onSubmit = async (data: any) => {
    if (!isCodeSent) {
      const req = {
        email: data.email,
      };
      const res: any = await dispatch(forgotPass(req));
      if (res.error) {
        setIsCodeSent(false);
      } else {
        setEmailSent(data.email);
        setIsCodeSent(true);
      }
    } else {
      const req = {
        email: emailSent,
        resetPasscode: data.resetPasscode,
        newPassword: data.newPassword,
      };
      if (data.newPassword === data.confirmNewPass) {
        setCheckMatchPass(true);
        // console.log(req);
        const res: any = await dispatch(resetPass(req));
        if (res.error) {
          console.log(res);
        } else {
          navigate('/login');
        }
      } else {
        setCheckMatchPass(false);
      }
    }
  };

  return (
    <div className="bg-white sm:w-fit w-full drop-shadow-2xl rounded-[10px] p-5">
      <div className="w-full flex flex-col items-center">
        {/* title */}
        <p className="pt-5 text-t8 font-medium text-black text-center">Reset Your Password</p>
        {/* message */}
        <p className="text-[#8792AB] text-t3 sm:w-[490px] w-full text-center mb-5">
          {isCodeSent
            ? 'We have sent a 5-digit code to your email address. This code will expire in 1 minute. Please check your email.'
            : 'Please enter your email address below, we will promptly send you a passcode to reset your password'}
        </p>
      </div>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* enter email */}
        {!isCodeSent && (
          <>
            <div className="relative">
              <input
                placeholder="Email"
                className={`block sm:w-[490px] w-full h-[47px] ${
                  errors?.email ? 'mb-[5px]' : 'mb-[20px]'
                } pl-[40px] sm:text-md text-t4 border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
                {...register('email', {
                  required: true,
                  pattern: Regex_Email,
                })}
              />
              <img src={ic_email} className="absolute w-[24px] h-[24px] left-[10px] bottom-[12px]" />
            </div>
            {errors?.email?.type === 'required' && (
              <p className="mb-[5px] text-danger text-[14px]">Email is required</p>
            )}
            {errors?.email?.type === 'pattern' && <p className="mb-[5px] text-danger text-[14px]">Email not valid</p>}
          </>
        )}

        {/* reset passcode */}
        {isCodeSent && (
          <>
            {/* new pass */}
            <>
              <div className="relative">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="New password"
                  className={`block sm:w-[490px] w-full h-[47px] ${
                    errors?.newPassword ? 'mb-[5px]' : 'mb-[15px]'
                  } pl-[40px] text-subText sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
                  {...register('newPassword', {
                    required: true,
                    pattern: Regex_Password,
                  })}
                />
                <img src={ic_password} className="absolute w-[24px] h-[24px] left-[10px] bottom-[12px]" />
                <div
                  onClick={() => togglePasswordVisiblity()}
                  className="w-[24px] h-[24px] bg-cover cursor-pointer absolute right-[10px] bottom-[12px]"
                  style={{ backgroundImage: `url(${passwordShown ? eye_gray : eye_closed})` }}
                />
              </div>
              {errors?.newPassword?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">New password is required</p>
              )}
              {errors?.newPassword?.type === 'pattern' && (
                <p className="mb-[5px] text-danger text-[14px]">New password is not valid</p>
              )}
            </>

            {/* confirm  pass */}
            <>
              <div className="relative">
                <input
                  type={passwordRepShown ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className={`block sm:w-[490px] w-full h-[47px] ${
                    errors?.confirmNewPass ? 'mb-[5px]' : 'mb-[15px]'
                  } pl-[40px] sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
                  {...register('confirmNewPass', {
                    required: true,
                    pattern: Regex_Password,
                  })}
                />
                <img src={ic_password} className="absolute w-[24px] h-[24px] left-[10px] bottom-[12px]" />
                <div
                  onClick={() => togglePasswordRepVisiblity()}
                  className="w-[24px] h-[24px] bg-cover cursor-pointer absolute right-[10px] bottom-[12px]"
                  style={{ backgroundImage: `url(${passwordRepShown ? eye_gray : eye_closed})` }}
                />
              </div>
              {errors?.confirmNewPass?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">Confirm password is required</p>
              )}
              {errors?.confirmNewPass?.type === 'pattern' && (
                <p className="mb-[5px] text-danger text-[14px]">Confirm password is not valid</p>
              )}
              {!checkMatchPass && <p className="mb-[5px] text-danger text-[14px]">Password not match</p>}
            </>

            {/* 5 digits code */}
            <>
              <input
                type="text"
                placeholder="5-digits code"
                className={`block sm:w-[172px] w-full h-[47px] ${
                  errors?.resetPasscode ? 'mb-[5px]' : 'mb-[15px]'
                } px-[30px] sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
                {...register('resetPasscode', {
                  required: true,
                  // max: 5,
                  // pattern: Regex_Password,
                })}
              />
              {errors?.resetPasscode?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">Reset code is required</p>
              )}
              {/* {errors?.resetPasscode?.type === 'max' && (
                <p className="mb-[5px] text-danger text-[14px]">Reset code is not valid</p>
              )} */}
            </>
          </>
        )}
        {/* buttons */}
        <button
          disabled={forgotPassStore.loading}
          type="submit"
          className={`${
            forgotPassStore.loading ? 'cursor-not-allowed bg-primary-400' : 'bg-primary'
          } flex items-center justify-center gap-3 w-full my-10 text-white font-medium py-2 rounded-[8px] transition hover:scale-[1.01] duration-150`}
        >
          {forgotPassStore.loading && <img src={spinner} className="animate-spin h-5 w-5" />}
          {isCodeSent
            ? forgotPassStore.loading
              ? 'Processing...'
              : 'Reset Password'
            : forgotPassStore.loading
            ? 'Processing...'
            : 'Confirm'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassForm;
