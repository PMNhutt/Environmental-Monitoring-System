import pagenotfound from 'src/share/lottie/page-not-found.json';
import Lottie from 'lottie-react';

const PageNotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-slate-200 ">
      <Lottie animationData={pagenotfound} loop={true} controls={false} className="h-[50%]" />
      <h1 className="text-t8 mt-10 font-medium">Page Not Found</h1>
      <button
        onClick={() => history.back()}
        className="bg-primary px-5 py-2 rounded-[10px] text-white font-medium mt-5"
      >
        Go back
      </button>
    </div>
  );
};

export default PageNotFound;
