import { useState } from 'react';
import plus from 'src/assets/images/plus_white.svg';
import defaultValue from 'src/utils/default';
import Node from './components/Node';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const LoRa = () => {
  const [activeDropdown, setActiveDropdown] = useState('');

  return (
    <div className="my-12">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-t7 font-semibold text-black">Personal space</h1>
          <p className="text-[#8792AB] text-t4">Node in Personal Space are only accessible to you</p>
        </div>

        <div>
          <Select
            MenuProps={defaultValue.MenuProps}
            value={activeDropdown}
            onChange={(e) => setActiveDropdown(e.target.value)}
            displayEmpty
            renderValue={activeDropdown !== '' ? undefined : () => <p className="text-[#898989]">Last created</p>}
            className={`block w-full h-[36px] text-[#D9D9D9] text-t3  border rounded-[5px] focus:outline-primary`}
          >
            <MenuItem value={1}>Last created</MenuItem>
            <MenuItem value={0}>Latest created</MenuItem>
          </Select>
        </div>
      </div>
      {/* body */}
      <div className="flex xl:flex-row flex-col w-full gap-12 justify-between">
        <button className="rounded-[6px] transition hover:bg-[#F3F4F6] flex flex-col justify-center items-center w-full xl:w-[362px] min-h-[275px] border-2 border-dashed border-gray-300 text-t4 font-medium text-black">
          <div className="rounded-full bg-primary w-[60px] h-[60px] mb-[24px] flex justify-center items-center">
            <img src={plus} className="object-cover w-[30px] h-[30px]" />
          </div>
          Create new node
        </button>

        <Node />
        <Node />
      </div>
    </div>
  );
};

export default LoRa;
