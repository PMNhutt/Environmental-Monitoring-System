import { IconButton, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useOutsideClick } from 'src/share/hooks/useOutSideClick';
import { SensorProps, UsersProps } from 'src/utils/interface';

// ** assets
import sensor from 'src/assets/images/sensor.svg';
import actions from 'src/assets/images/sensorAction.svg';

// ** redux
import { useAppDispatch } from 'src/redux/store/hooks';

interface Props {
  currentUser: UsersProps;
  sensorList: SensorProps[];
  setSensorList: any;
  setUpdateData: any;
  editSensorData: any;
  setEditSensorData: any;
  nodeId: any;
}

interface SensorItemProps {
  sensorData: any;
  setOpenEditModal: any;
  setUpdateData: any;
  setEditSensorData: any;
}

const SensorItem: React.FC<SensorItemProps> = (props) => {
  const { sensorData, setOpenEditModal, setUpdateData, setEditSensorData } = props;
  const [openOptions, setOpenOptions] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const ref = useOutsideClick(() => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  const handleDeleteSensor = () => {
    console.log('do sth');
  };

  // handle edit node
  const handleEditNode = async () => {
    console.log('do sth');
  };

  const getSensorLabel = (data: any) => {
    switch (data) {
      case 'HUMIDITY':
        return 'Humidity Sensor';
      case 'LIGHT':
        return 'Light Sensor';
      case 'TEMPERATURE':
        return 'Temperature Sensor';
      case 'SMOKE':
        return 'Smoke Sensor';
      default:
        break;
    }
  };

  return (
    <div className="w-full flex justify-between items-center pb-2 mb-2 border-b border-b-[#D9D9D9]">
      <div className="md:w-2/3 w-full flex lg:flex-row flex-col gap-3">
        {/* sensor name */}
        <div className="flex sm:flex-row flex-col sm:items-center gap-3 lg:w-1/2 w-full">
          <div className="w-[133px] h-[68px] bg-[#F3F4F6] border border-[#BDC1CA] flex justify-center items-center">
            <img src={sensor} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <p className="text-t4 font-semibold text-black">{getSensorLabel(sensorData.type)}</p>
            <p className="text-t3 font-medium text-[#8792AB]">Code: {sensorData.sensorCode}</p>
          </div>
        </div>
        {/* belong */}
        <div className="lg:w-1/2 w-full flex items-center">
          <div className="flex flex-col">
            <p className="text-t4 font-semibold text-black">{sensorData.nodeBelongName}</p>
            <p className="text-t3 font-medium text-[#8792AB]">Code: {sensorData.nodeBelongCode}</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 w-full flex md:flex-row flex-col">
        {/* actions */}
        <div className="w-full flex justify-end">
          <div className="relative">
            <Tooltip title={'Options'} placement="top">
              <IconButton
                disabled={openOptions}
                onClick={() => {
                  if (!openOptions) setOpenOptions(true);
                }}
              >
                <img src={actions} className="object-contain" />
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
                  className="absolute z-10 top-15 left-[25%] transform translate-x-[-50%] bg-white border shadow-sm rounded-[5px] font-medium text-t3"
                >
                  <li onClick={() => handleEditNode()} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                    Edit
                  </li>
                  <li onClick={() => setOpenConfirm(true)} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                    Delete
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const SensorList: React.FC<Props> = (props) => {
  const { sensorList, setUpdateData, currentUser, editSensorData, setEditSensorData, nodeId } = props;

  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      {/* header */}
      <div className="w-full flex justify-between md:flex-row flex-col gap-5">
        <div>
          <p className="text-t6 font-semibold">Sensor list</p>
          <p className="text-[#8792AB] text-t4">List of existing sensor in the application</p>
        </div>

        {/* search */}
        <div className="relative h-fit">
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
            className="block w-full sm:w-[237px] p-[8px] pl-[40px] text-t3 rounded-[6px] border border-[#D9D9D9] focus:outline-primary "
            placeholder={'Search'}
          />
        </div>
      </div>
      {/* list */}
      <div className="border border-[#B4BECF] px-5 py-2 rounded my-4">
        {/* label */}
        <div className="flex">
          <div className="md:w-2/4 w-full">
            <p className="">Name</p>
          </div>
          <div className="md:w-2/4 w-full flex md:flex-row flex-col">
            <p className="md:w-1/2 hidden md:block">Belong to node</p>
            <p className="md:w-1/2 w-full flex justify-end">Actions</p>
          </div>
        </div>
        {/* list sensors */}
        <div className="my-5">
          {sensorList.map((sensor: SensorProps) => (
            <div key={sensor.id}>
              <SensorItem
                sensorData={sensor}
                setOpenEditModal={setOpenModal}
                setUpdateData={setUpdateData}
                setEditSensorData={setEditSensorData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorList;
