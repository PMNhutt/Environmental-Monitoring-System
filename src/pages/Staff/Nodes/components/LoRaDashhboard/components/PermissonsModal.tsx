import React, { useState } from 'react';
import { Modal } from '@mui/material';

import icon from 'src/assets/images/permission.svg';

interface PermissonProps {
  openModal: boolean;
  setOpenModal: any;
}

const PermissonsModal: React.FC<PermissonProps> = (props) => {
  const { openModal, setOpenModal } = props;
  const [searchValue, setSearchValue] = useState('');

  // handle save permisson
  const handleConfirmModal = () => {
    console.log('do sth');
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
  top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-[432px] w-full bg-white rounded-[4px] p-4 font-poppins"
      >
        {/* header */}
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <img src={icon} className="object-contain w-[36px]" />
          <p className="text-[#323743] font-medium text-t7">Who can see this Node</p>
          <p className="text-[#323743] text-t4">Assign or remove customer permission </p>
        </div>
        {/* content */}
        {/* search input */}
        <div className="relative my-5">
          <svg
            aria-hidden="true"
            className="w-[15px] h-[15px] text-[#b5b5b5] dark:text-[#b5b5b5] absolute top-[50%] translate-y-[-50%] left-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            value={searchValue ? searchValue : ''}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            id="search"
            className="block w-full p-[8px] pl-[40px] text-t3 rounded-[6px] bg-[#F3F4F6] focus:outline-primary "
            placeholder={'Search'}
          />
        </div>

        {/* buttons */}
        <div className="flex justify-end items-center gap-4 mt-10 mx-4">
          <button
            onClick={() => setOpenModal(false)}
            className="border-primary border text-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirmModal()}
            className=" text-white bg-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PermissonsModal;
