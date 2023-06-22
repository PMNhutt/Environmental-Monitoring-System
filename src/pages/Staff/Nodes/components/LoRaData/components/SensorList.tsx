import { IconButton, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import plus from 'src/assets/images/plus_white.svg';
import sensor from 'src/assets/images/sensor.svg';
import actions from 'src/assets/images/sensorAction.svg';
import { deleteSensors } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';
import ConfirmModal from 'src/share/components/ConfirmModal';
import { useOutsideClick } from 'src/share/hooks/useOutSideClick';
import { SensorProps, UsersProps } from 'src/utils/interface';
import CreateModal from './CreateModal';

interface Props {
  currentUser: UsersProps;
  sensorList: SensorProps[];
  setUpdateData: any;
  editSensorData: any;
  setEditSensorData: any;
  nodeId: any;
}

interface ListItemProps {
  sensorData: any,
  title: string,
  setOpenEditModal: any,
  setUpdateData: any;
  setEditSensorData: any;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { sensorData, title, setOpenEditModal, setUpdateData, setEditSensorData } = props;
  const [openOptions, setOpenOptions] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const ref = useOutsideClick(() => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  const handleDeleteSensor = () => {
    dispatch(deleteSensors(sensorData.id)).then(() => {
      setUpdateData((prev: any) => !prev);
      setOpenConfirm(false);
    });
  };

  // handle edit node
  const handleEditNode = () => {
    setOpenEditModal(true);
    setEditSensorData(sensorData);
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
    <>
      {openConfirm && (
        <ConfirmModal
          description="Delete this node?"
          openModal={openConfirm}
          setOpenModal={setOpenConfirm}
          rowData={sensorData.id}
          handleConfirm={handleDeleteSensor}
        />
      )}
      <div className="w-full flex justify-between items-center pb-2 mb-2 border-b border-b-[#D9D9D9]">
        <div className="flex sm:flex-row flex-col sm:items-center gap-3">
          <div className="w-[133px] h-[68px] bg-[#F3F4F6] border border-[#BDC1CA] flex justify-center items-center">
            <img src={sensor} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <p className="text-t4 font-semibold text-black">{getSensorLabel(sensorData.type)}</p>
            <p className="text-t3 font-medium text-black">ID: {sensorData.sensorId}</p>
          </div>
        </div>
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
    </>
  );
};

const SensorList: React.FC<Props> = (props) => {
  const {
    sensorList,
    setUpdateData,
    currentUser,
    editSensorData,
    setEditSensorData,
    nodeId,
  } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && (
        <CreateModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setUpdateData={setUpdateData}
          editData={editSensorData}
          nodeId={nodeId}
        />
      )}
      <div className="p-5 border-[#B4BECF] border bg-white rounded w-full">
        <div className="flex justify-between">
          <p className="text-t7 font-semibold mb-3">Sensors list</p>
          <button
            onClick={() => {
              setOpenModal(true);
              setEditSensorData(undefined);
            }}
            className="mb-[24px]"
          >
            <div className="rounded-full bg-primary hover:bg-primary-400 w-[50px] h-[50px] flex justify-center items-center">
              <img src={plus} className="object-cover w-[25px] h-[25px]" />
            </div>
          </button>
        </div>
        <div className="w-full justify-between flex">
          <p className="text-t4">Name</p>
          <p className="text-t4">Actions</p>
        </div>
        {/* list */}
        <div className="my-5">
          {sensorList.length > 0 ? (
            <>
              {sensorList.map((sensor: SensorProps) => (
                <div key={sensor.id}>
                  <ListItem
                    sensorData={sensor}
                    title="Water sensors"
                    setOpenEditModal={setOpenModal}
                    setUpdateData={setUpdateData}
                    setEditSensorData={setEditSensorData}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {currentUser.role == 'USER' && (
                <p className="my-5 font-medium text-danger">
                  No sensors have been configure yet, Please reach out to our staff for asistance
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SensorList;
