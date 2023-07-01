import { IconButton } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moreInfoIcon from 'src/assets/images/more-info.png';
import actions from 'src/assets/images/sensorAction.svg';
import { deleteSensors, editSensorThreshold, getSensor, getSensorIntervalLatestData } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';
import ConfirmModal from 'src/share/components/ConfirmModal';
import { useOutsideClick } from 'src/share/hooks/useOutSideClick';
import { LoRaTypeProps, SensorProps } from 'src/utils/interface';
import InfoTooltip from './InfoTooltip';

const LoRaType: React.FC<LoRaTypeProps> = (props) => {
  const { sensorData, setSelectedSensorId, selectedSensorId, sensorList, setSensorList, setUpdateData, setOpenEditModal, setEditSensorData } = props;
  const [latestData, setLatestData] = useState(0);
  const [openOptions, setOpenOptions] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [level, setLevel] = useState('');
  const dispatch = useAppDispatch();
  const ref = useOutsideClick(() => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      min: sensorData.minThreshold,
      max: sensorData.maxThreshold,
    },
  });

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 420,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getSensorIntervalLatestData(sensorData.id)).then((res: any) => {
        const resData = res.payload.data;
        if (resData) {
          setLatestData(res.payload.data);
        }
        if (resData > sensorData.maxThreshold) {
          setLevel('High');
        } else if (resData < sensorData.minThreshold) {
          setLevel('Low');
        } else if (resData !== undefined) {
          setLevel('Normal');
        } else if (resData === undefined) {
          setLatestData(0);
          setLevel('');
        }
      });
    };
    fetchData();
    const handler = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(handler);
  }, [sensorData]);

  // ** get lora type data
  const getLoRaLevel = (data: any) => {
    switch (data) {
      case 'High':
      case 'Low':
        return 'text-danger';
      case 'Normal':
        return 'text-success';
      default:
        break;
    }
  };

  const getSensorLabel = (data: any) => {
    switch (data) {
      case 'HUMIDITY':
        return 'Humidity';
      case 'LIGHT':
        return 'Light';
      case 'TEMPERATURE':
        return 'Temperature';
      case 'SMOKE':
        return 'Smoke';
      default:
        break;
    }
  };

  const handleDeleteSensor = () => {
    dispatch(deleteSensors(sensorData.id)).then(() => {
      setUpdateData((prev: any) => !prev);
      setOpenConfirm(false);
    });
  };

  const handleEditNode = async () => {
    const res = await dispatch(getSensor(sensorData.id));
    setOpenEditModal(true);
    setEditSensorData(res.payload);
  };


  const onSubmit = (data: any) => {
    const request = {
      min: data.min,
      max: data.max,
    };
    dispatch(editSensorThreshold({ req: request, sensorId: sensorData.id })).then((res: any) => {
      // set current sensor data return by api here
      if (!res.error) {
        const newList = sensorList.map((item: SensorProps) => {
          if (item.id === sensorData.id) {
            const updatedItem: SensorProps = {
              ...item,
              ...res.payload,
            };
            return updatedItem;
          }
          return item;
        });
        setSensorList(newList);
      }
    });
  };

  return (
    <>
      {openConfirm && (
        <ConfirmModal
          description="Delete this sensor?"
          openModal={openConfirm}
          setOpenModal={setOpenConfirm}
          rowData={sensorData.id}
          handleConfirm={handleDeleteSensor}
        />
      )}
      <div className="border-[#B4BECF] border rounded p-2 ">
        <div
          onClick={() => {
            setSelectedSensorId(sensorData.id)
          }}
          className={`${selectedSensorId === sensorData.id
            ? 'bg-[#EFEDFD] border-primary '
            : 'bg-white border-[#B4BECF] hover:bg-gray-100'
            } max-w-[200px] max-h-[200px] border bg-[#EFEDFD] p-4 pt-5 rounded cursor-pointer transition relative`}
        >
          <p
            className={`${selectedSensorId === sensorData.id ? 'text-primary' : 'text-[#424856]'
              } font-semibold text-black text-t7 text-center `}
          >
            {getSensorLabel(sensorData.type)}
          </p>
          <div className="flex justify-center">
            {/* number */}
            <p className={`text-[60px] leading-[90px] ${getLoRaLevel(level)}`}>{latestData}</p>
          </div>
          <p className="text-[#323743] text-t5 text-center">
            {level ? (
              <>
                Level: <span className={`${getLoRaLevel(level)} font-semibold`}>{level}</span>
              </>
            ) : (
              <>No Data</>
            )}
          </p>
          {/* more info */}
          <HtmlTooltip
            title={
              <>
                <InfoTooltip type={sensorData.type} />
              </>
            }
            placement="bottom-start"
          >
            <div className="absolute bottom-0 right-0 w-6 h-6 ">
              <img src={moreInfoIcon} className="object-contain" />
            </div>
          </HtmlTooltip>
          <div className="absolute top-0 right-0 w-7 h-7">
            <div className="relative z-[100]">
              <Tooltip title={'Options'} placement="top">
                <IconButton
                  sx={{ padding: "5px" }}
                  classes='p-0'
                  disabled={openOptions}
                  onClick={(e) => {
                    e.stopPropagation();
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
                    <li onClick={(e) => {
                      e.stopPropagation();
                      handleEditNode();
                    }} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                      Edit
                    </li>
                    <li onClick={(e) => {
                      e.stopPropagation();
                      setOpenConfirm(true);
                    }} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                      Delete
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between py-2 min-w-[200px]">
            <label className="text-t3 max-w-[50px] font-semibold  pr-2 text-center">Min:</label>
            <input
              type="text"
              placeholder="Min threshold"
              className={`block max-w-[150px] h-[36px] ${errors?.min ? 'mb-[5px]' : 'mb-[0px]'
                } text-center p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
              {...register('min', {
                required: false,
              })}
            />
            {errors?.min?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Min is required</p>}
          </div>
          <div className="flex items-center justify-between py-2 max-w-[200px]">
            <label className="text-t3 max-w-[50px] font-semibold text-[#424856] pr-2">Max:</label>
            <input
              type="text"
              placeholder="Max threshold"
              className={`block max-w-[150px] h-[36px] ${errors?.max ? 'mb-[5px]' : 'mb-[0px]'
                } text-center p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
              {...register('max', {
                required: false,
              })}
            />
            {errors?.max?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Max is required</p>}
          </div>
          <button type="submit" className="w-full text-white bg-primary text-t3 font-medium py-1 mt-2 rounded-[6px]">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default LoRaType;
