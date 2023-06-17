import nodes from 'src/assets/images/Nodes.svg';
import options from 'src/assets/images/table_options.svg';

import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Node = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-[6px] hover:shadow-md flex flex-col justify-center items-center w-full xl:w-[362px] h-[275px] border-2 border-gray-300 text-t4 font-medium text-black">
      {/* images */}
      <div
        onClick={() => navigate(`/nodes/${crypto.randomUUID()}`)}
        className="cursor-pointer h-3/4 w-full flex justify-center items-center rounded-tr-[6px] rounded-tl-[6px] bg-[#F3F4F6]"
      >
        <img src={nodes} className="object-cover h-[70px] w-[135px]" />
      </div>
      {/* details */}
      <div className="h-1/4 w-full px-5 py-2 border-t-2 border-gray-300 flex justify-between">
        <div onClick={() => navigate(`/nodes/${crypto.randomUUID()}`)} className="cursor-pointer">
          <p className="text-t4 font-semibold text-black">Living room sensors</p>
          <p className="text-t2 font-medium text-[#8792AB]">Yesterday</p>
        </div>

        <div>
          <Tooltip title={'Options'} placement="top">
            <IconButton>
              <img src={options} className="transform rotate-90 object-contain w-[14px] h-[16px]" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Node;
