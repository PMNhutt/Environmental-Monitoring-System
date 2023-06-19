import nodes from 'src/assets/images/Nodes.svg';
import options from 'src/assets/images/table_options.svg';

import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NodeProps } from 'src/utils/interface';

import relativeTime from 'dayjs/plugin/relativeTime';
import localFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

interface Props {
  nodeData: NodeProps;
}

const Node: React.FC<Props> = (props) => {
  const { nodeData } = props;
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  dayjs.extend(localFormat);

  return (
    <div className="rounded-[6px] hover:shadow-md flex flex-col justify-center items-center w-full xl:w-[362px] border-2 border-gray-300 text-t4 font-medium text-black">
      {/* images */}
      <div
        onClick={() => navigate(`/nodes/${nodeData.id}`)}
        className="cursor-pointer h-[203px] w-full flex justify-center items-center rounded-tr-[6px] rounded-tl-[6px] bg-[#F3F4F6]"
      >
        <img src={nodes} className="object-cover h-[70px] w-[135px]" />
      </div>
      {/* details */}
      <div className="h-1/4 w-full px-5 py-2 border-t-2 border-gray-300 flex justify-between">
        <div onClick={() => navigate(`/nodes/${nodeData.id}`)} className="cursor-pointer">
          <p className="text-t4 font-semibold text-black">{nodeData.name}</p>
          <p className="text-t3 font-medium text-black">ID: {nodeData.nodeId}</p>
          <p className="text-t2 font-medium text-[#8792AB] mt-1">
            Created: {dayjs(nodeData.createdDate).format('D/M/YYYY')}
          </p>
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
