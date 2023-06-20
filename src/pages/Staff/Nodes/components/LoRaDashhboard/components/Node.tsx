import { useState, useEffect } from 'react';
import nodes from 'src/assets/images/Nodes.svg';
import options from 'src/assets/images/table_options.svg';
import { useOutsideClick } from 'src/share/hooks/useOutSideClick';
import ConfirmModal from 'src/share/components/ConfirmModal';

// ** redux
import { useAppDispatch } from 'src/redux/store/hooks';
import { deleteNodes } from 'src/redux/slices/nodeSlice';

import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NodeProps } from 'src/utils/interface';

import relativeTime from 'dayjs/plugin/relativeTime';
import localFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  nodeData: NodeProps;
  setUpdateData: any;
  setEditNodeData: any;
  setOpenEditModal: any;
}

const Node: React.FC<Props> = (props) => {
  const { nodeData, setUpdateData, setEditNodeData, setOpenEditModal } = props;
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  dayjs.extend(localFormat);
  const dispatch = useAppDispatch();

  const [openOptions, setOpenOptions] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const ref = useOutsideClick(() => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  // handle delete node
  const handleDeleteNode = () => {
    dispatch(deleteNodes(nodeData.id)).then(() => {
      setUpdateData((prev: any) => !prev);
      setOpenConfirm(false);
    });
  };

  // handle edit node
  const handleEditNode = () => {
    setOpenEditModal(true);
    setEditNodeData(nodeData);
  };

  return (
    <>
      {openConfirm && (
        <ConfirmModal
          description="Delete this node?"
          openModal={openConfirm}
          setOpenModal={setOpenConfirm}
          rowData={nodeData.id}
          handleConfirm={handleDeleteNode}
        />
      )}
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

          <div className="relative">
            <Tooltip title={'Options'} placement="top">
              <IconButton
                disabled={openOptions}
                onClick={() => {
                  if (!openOptions) setOpenOptions(true);
                }}
              >
                <img src={options} className="transform rotate-90 object-contain w-[14px] h-[16px]" />
              </IconButton>
            </Tooltip>

            {/* options menu */}
            <AnimatePresence>
              {openOptions && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  exit={{ opacity: 0 }}
                  ref={ref}
                  className="absolute top-8 left-[50%] transform translate-x-[-50%] bg-white border shadow-sm rounded-[5px] font-medium text-t3"
                >
                  <li onClick={() => handleEditNode()} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                    Edit
                  </li>
                  <li onClick={() => setOpenConfirm(true)} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                    Delete
                  </li>
                  <li className="cursor-pointer py-2 px-3 hover:bg-gray-100">Permissions</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Node;
