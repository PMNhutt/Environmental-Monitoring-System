import { IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
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

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" transform="rotate(90)"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
      // transform: 'rotate(-90deg)'
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
  '& .MuiSwitch-switchBase': {
    // transitionDuration: '300ms',
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#535CE8',
        opacity: 1,
      },
    },
  },
}));

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
        const maxThreshold = sensorData.maxThreshold;
        const minThreshold = sensorData.minThreshold;
        const thresholdRange = maxThreshold - minThreshold;
        const lowThreshold = minThreshold - (thresholdRange * 0.2);
        const veryLowThreshold = minThreshold - (thresholdRange * 0.6);
        const pretttLowThreshold = minThreshold + (thresholdRange * 0.2);
        const pretttHighThreshold = maxThreshold - (thresholdRange * 0.2);
        const highThreshold = maxThreshold + (thresholdRange * 0.2);
        const veryHighThreshold = maxThreshold + (thresholdRange * 0.6);
        if (resData < veryLowThreshold) {
          setLevel('Extremely Low');
        } else if (resData >= veryLowThreshold && resData < lowThreshold) {
          setLevel('Very Low');
        } else if (resData >= lowThreshold && resData < minThreshold) {
          setLevel('Low');
        } else if (resData >= minThreshold && resData < pretttLowThreshold) {
          setLevel('Pretty Low');
        } else if (resData >= pretttLowThreshold && resData <= pretttHighThreshold) {
          setLevel('Normal');
        } else if (resData > pretttHighThreshold && resData <= maxThreshold) {
          setLevel('Pretty High');
        } else if (resData > maxThreshold && resData <= highThreshold) {
          setLevel('High');
        } else if (resData > highThreshold && resData <= veryHighThreshold) {
          setLevel('Very High');
        } else if (resData > veryHighThreshold) {
          setLevel('Extremely High');
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
      case 'Extremely Low':
        return 'text-[#006FFF]';
      case 'Very Low':
        return 'text-[#00ADFF]';
      case 'Low':
        return 'text-[#00D9F3]';
      case 'Pretty Low':
        return 'text-[#6CFACD]';
      case 'Normal':
        return 'text-success';
      case 'Pretty High':
        return 'text-warning';
      case 'High':
        return 'text-[#FF8C5E]';
      case 'Very High':
        return 'text-[#B50000]';
      case 'Extremely High':
        return 'text-[#FF0000]';
        // return 'text-danger';
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
            } w-[225px] h-[205px] border bg-[#EFEDFD] p-4 pt-5 rounded cursor-pointer transition relative`}
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
                Level: <span className={`${getLoRaLevel(level)} font-semibold text-t5`}>{level}</span>
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
          <div className="absolute rotate-[270deg] top-[-0.4rem] right-[-3.5rem]">
            <Android12Switch
              onClick={(e) => {
                e.stopPropagation();
              }}
              // checked={sensorData}
              defaultChecked />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between py-2 max-w-[300px]">
            <label className="text-t3 max-w-[50px] font-semibold pr-2 text-center">Min:</label>
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
          <div className="flex items-center justify-between py-2 max-w-[300px]">
            <label className="text-t3 max-w-[50px] font-semibold pr-2 text-center">Max:</label>
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
