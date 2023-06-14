const EditInfoPlaceholder = () => {
  return (
    <div>
      <p className="text-black text-t8 font-medium">Profile</p>
      {/* form */}
      <div className="mt-4">
        <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
          <div className="w-full">
            <label className="text-t3 font-semibold text-[#424856]">First name</label>
            <p
              className={`block w-full h-[36px]
              mb-[10px] animate-pulse p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] 
              rounded-[5px] focus:outline-primary`}
            />
          </div>

          <div className="w-full">
            <label className="text-t3 font-semibold text-[#424856]">Last name</label>
            <p
              className={`block w-full h-[36px] mb-[10px] animate-pulse p-[12px] text-t3
              bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            />
          </div>
        </div>

        <>
          <label className="text-t3 font-semibold text-[#424856]">Address</label>
          <p
            className={`block w-full h-[36px] mb-[10px] animate-pulse
          p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          />
        </>

        <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
          <div className="w-full">
            <label className="text-t3 font-semibold text-[#424856]">Phone</label>
            <p
              className={`block w-full h-[36px]
              mb-[10px] animate-pulse p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] 
              rounded-[5px] focus:outline-primary`}
            />
          </div>

          <div className="w-full">
            <label className="text-t3 font-semibold text-[#424856]">Date of birth</label>
            <p
              className={`block w-full h-[36px] mb-[10px] animate-pulse p-[12px] text-t3
              bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            />
          </div>
        </div>
      </div>

      <div className="py-3 border-t border-t-[#D9D9D9] mt-5">
        <p className="text-black text-t8 font-medium">Account</p>

        <div className="mt-4">
          <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">Email</label>
              <p
                className={`block w-full h-[36px]
              mb-[10px] animate-pulse p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] 
              rounded-[5px] focus:outline-primary`}
              />
            </div>

            <div className="w-full">
              <label className="text-t3 font-semibold text-[#424856]">Password</label>
              <p
                className={`block w-full h-[36px] mb-[10px] animate-pulse p-[12px] text-t3
              bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfoPlaceholder;
