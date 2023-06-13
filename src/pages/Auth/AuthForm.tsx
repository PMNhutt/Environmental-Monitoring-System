/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';

import instances from 'src/utils/plugins/axios';
import { Regex_Email, Regex_Password } from 'src/utils/regex';
import { AuthFormProps } from 'src/utils/interface';
import { fetchLogin, fetchRegister } from 'src/redux/slices/authSlice';

// ** assets
import eye_gray from 'src/assets/images/ic_eye_gray.svg';
import eye_closed from 'src/assets/images/ic_eye_closed.svg';
import ic_email from 'src/assets/images/email_form.svg';
import ic_password from 'src/assets/images/password_form.svg';
import spinner from 'src/assets/images/spinner.svg';

const AuthForm: React.FC<AuthFormProps> = (props) => {
  //** Const */
  const { isLogin } = props;
  const accessToken = localStorage.getItem('accessToken');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordRepShown, setPasswordRepShown] = useState(false);
  const [checkMatchPass, setCheckMatchPass] = useState(true);

  // const notifyError = (err: string) =>
  //   toast.error(err, {
  //     pauseOnHover: false,
  //   });

  // ** toggle show password
  // ** Funct
  const togglePasswordVisiblity = () => {
    setPasswordShown((prev) => !prev);
  };

  const togglePasswordRepVisiblity = () => {
    setPasswordRepShown((prev) => !prev);
  };

  // ** handle submit form
  const onSubmit = (data: any) => {
    // isLogin
    if (isLogin) {
      dispatch(fetchLogin(data)).then((res) => {
        if (res.payload.role == 'ADMIN') {
          navigate('/admin');
        }
        if (res.payload.role == 'STAFF') {
          navigate('/nodes');
        }
        if (res.payload.role == 'USER') {
          navigate('/');
        }
      });

      // toast.promise(
      //   // instances.post('/user/login', data).then((res) => {
      //   //   const decoded: any = jwt_decode(res?.data?.token);
      //   //   localStorage.setItem('accessToken', res.data.token);
      //   //   if (decoded?.role == 'ADMIN') {
      //   //     navigate('/admin');
      //   //   }
      //   //   if (decoded?.role === 'STAFF') {
      //   //     navigate('/nodes');
      //   //   }
      //   //   if (decoded?.role === 'USER') {
      //   //     navigate('/');
      //   //   }
      //   // })
      //   dispatch(fetchLogin(data)),
      //   {
      //     pending: 'Checking information...',
      //     success: 'Login succussfully! 👌',
      //     error: {
      //       render({ data }: any) {
      //         return data.response?.data.detail;
      //       },
      //     },
      //   },
      // );
    } else {
      if (data.password == data.rePassword) {
        const registerReq: any = {
          email: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          password: data.password,
        };
        dispatch(fetchRegister(registerReq)).then((res) => {
          // console.log(res);
          if (res.payload.role == 'ADMIN') {
            navigate('/admin');
          }
          if (res.payload.role == 'STAFF') {
            navigate('/nodes');
          }
          if (res.payload.role == 'USER') {
            navigate('/');
          }
        });
        setCheckMatchPass(true);
      } else {
        setCheckMatchPass(false);
      }
    }
  };

  return (
    <div className="bg-white sm:w-fit w-full drop-shadow-2xl rounded-[10px] p-5">
      {/* title */}
      <p className="py-5 text-t8 font-medium text-black text-center mb-5">{isLogin ? 'Log in' : 'Create an account'}</p>

      {/* inputs */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* firstname, lastname */}
        {!isLogin && (
          <div className="flex sm:gap-3 sm:w-[490px] sm:flex-row flex-col w-full">
            <div className="w-full">
              <input
                type="text"
                placeholder="First Name"
                className={`block w-full h-[47px] ${
                  errors?.firstname ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md font-poppins border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
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
              <input
                type="text"
                placeholder="Last Name"
                className={`block w-full h-[47px] ${
                  errors?.lastname ? 'mb-[5px]' : 'mb-[20px]'
                } p-[12px] text-subText sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
                {...register('lastname', {
                  required: true,
                  // pattern: {
                  //   value: Regex_Password,
                  // },
                })}
              />
              {errors?.lastname?.type === 'required' && (
                <p className="mb-[5px] text-danger text-[14px]">Last name is required</p>
              )}
            </div>
          </div>
        )}
        {/* email */}
        <div className="relative">
          <input
            placeholder="Email"
            className={`block sm:w-[490px] w-full h-[47px] ${
              errors?.email ? 'mb-[5px]' : 'mb-[20px]'
            } pl-[40px] text-subText sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
            {...register('email', {
              required: true,
              pattern: Regex_Email,
            })}
          />
          <img src={ic_email} className="absolute w-[24px] h-[24px] left-[10px] bottom-[12px]" />
        </div>
        {errors?.email?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Email is required</p>}
        {errors?.email?.type === 'pattern' && <p className="mb-[5px] text-danger text-[14px]">Email not valid</p>}

        {/* password */}
        <div className="relative">
          <input
            type={passwordShown ? 'text' : 'password'}
            placeholder="Password"
            className={`block sm:w-[490px] w-full h-[47px] ${
              errors?.password ? 'mb-[5px]' : 'mb-[15px]'
            } pl-[40px] text-subText sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
            {...register('password', {
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
        {errors?.password?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Password is required</p>
        )}
        {errors?.password?.type === 'pattern' && (
          <p className="mb-[5px] text-danger text-[14px]">Mật khẩu không hợp lệ</p>
        )}

        {/* repeat pass */}
        {!isLogin && (
          <>
            <div className="relative">
              <input
                type={passwordRepShown ? 'text' : 'password'}
                placeholder="Repeat Password"
                className={`block sm:w-[490px] w-full h-[47px] ${
                  errors?.rePassword ? 'mb-[5px]' : 'mb-[15px]'
                } pl-[40px] text-subText sm:text-md  border border-[#d4d4d4] rounded-[5px] focus:outline-primary`}
                {...register('rePassword', {
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
            {errors?.rePassword?.type === 'required' && (
              <p className="mb-[5px] text-danger text-[14px]">Password is required</p>
            )}
            {errors?.rePassword?.type === 'pattern' && (
              <p className="mb-[5px] text-danger text-[14px]">Password not valid</p>
            )}
            {!checkMatchPass && <p className="mb-[5px] text-danger text-[14px]">Password not match</p>}
          </>
        )}

        {/* forgot pass */}
        {isLogin && (
          <div className="w-full flex justify-end">
            <p
              onClick={() => navigate('/forgot-password')}
              className="text-[15px] cursor-pointer font-medium text-primary w-fit"
            >
              Forgot password?
            </p>
          </div>
        )}
        {/* buttons */}
        <button
          disabled={authStore.loading}
          type="submit"
          className={`${
            authStore.loading ? 'cursor-not-allowed bg-primary-400' : 'bg-primary'
          } flex items-center justify-center gap-3 w-full mt-10 mb-20 text-white font-medium py-2 rounded-[8px] transition hover:scale-[1.01] duration-150`}
        >
          {authStore.loading && <img src={spinner} className="animate-spin h-5 w-5" />}
          {isLogin ? (authStore.loading ? 'Processing...' : 'Log in') : authStore.loading ? 'Processing...' : 'Sign up'}
        </button>
      </form>

      {/* message */}
      <p className="text-center">
        {isLogin ? `Don't have an account?` : 'Already have an account?'}{' '}
        <span
          onClick={() => navigate(`${isLogin ? '/register' : '/login'}`)}
          className="underline cursor-pointer text-primary"
        >
          {isLogin ? ' Sign up now' : 'Log in'}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
