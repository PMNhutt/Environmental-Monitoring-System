import Logo from '../Logo/Logo';

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <Logo />
      <p className="text-[18px] font-medium">Loaing...</p>
    </div>
  );
};

export default Loading;
