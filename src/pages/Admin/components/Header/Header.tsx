import React, { useState } from 'react';

import { setUserDetail } from 'src/redux/slices/usersSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

// ** assets
import plus from 'src/assets/images/plus_white.svg';
import fitler from 'src/assets/images/filter.svg';

interface ButtonProps {
  active: number;
  text: string;
  id: number;
}

interface HeaderProps {
  setOpenModal: any;
  setModalTitle: any;
  setIsModalDetail: any;
  setSearchValue: any;
  searchValue: any;
  activeBtn: any;
  setActiveBtn: any;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { active, text, id } = props;

  return (
    <button
      className={`px-8 py-2 text-t3 font-medium rounded-full transition ${
        active == id ? 'bg-primary text-white' : 'text-primary hover:bg-gray-100'
      }`}
    >
      {text}
    </button>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  const { setOpenModal, setModalTitle, setIsModalDetail, searchValue, setSearchValue, activeBtn, setActiveBtn } = props;
  // const [activeBtn, setActiveBtn] = useState(1);
  const dispatch = useAppDispatch();

  return (
    <section className="w-full flex lg:flex-row lg:gap-0 gap-8 flex-col lg:items-center justify-between">
      {/* data filter */}
      <div className="flex flex-wrap">
        <div onClick={() => setActiveBtn(1)}>
          <Button active={activeBtn} id={1} text="All users" />
        </div>
        <div onClick={() => setActiveBtn(2)}>
          <Button active={activeBtn} id={2} text="Active" />
        </div>
        <div onClick={() => setActiveBtn(3)}>
          <Button active={activeBtn} id={3} text="Inactive" />
        </div>
      </div>
      {/* search */}
      <div className="flex gap-5 flex-wrap">
        {/* new user */}
        <button
          onClick={() => {
            setOpenModal(true);
            setModalTitle('Create new account');
            setIsModalDetail(false);
            dispatch(setUserDetail(undefined));
          }}
          className="rounded-[6px] text-t3 bg-primary text-white font-medium py-2 px-3 flex items-center gap-2"
        >
          <img src={plus} className="object-cover w-[15px] h-[15px]" />
          New
        </button>
        {/* search input */}
        <div className="relative">
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
            className="block w-full sm:w-[213px] p-[8px] pl-[40px] text-t3 rounded-[6px] bg-[#F3F4F6] focus:outline-primary "
            placeholder={'Search'}
          />
        </div>
        {/* filter button */}
        <button className="bg-[#F3F4F6] rounded-[6px] p-2 px-3">
          <img src={fitler} className="object-cover w-[12px] h-[12px]" />
        </button>
      </div>
    </section>
  );
};

export default Header;
