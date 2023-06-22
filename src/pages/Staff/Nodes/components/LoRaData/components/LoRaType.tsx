
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { editSensorThreshold, getSensorIntervalLatestData } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';
import { LoRaTypeProps, SensorProps } from 'src/utils/interface';

const LoRaType: React.FC<LoRaTypeProps> = (props) => {
  const { sensorData, setSelectedSensorId, selectedSensorId, sensorList, setSensorList } = props;
  const [latestData, setLatestData] = useState(0);
  const [level, setLevel] = useState("");
  const dispatch = useAppDispatch();

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
    }
    fetchData();
    const handler = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(handler);
  }, []);

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

  const onSubmit = (data: any) => {
    const request = {
      min: data.min,
      max: data.max,
    };
    dispatch(editSensorThreshold({req: request, sensorId: sensorData.id})).then((res: any) => {
      // set current sensor data return by api here
      if(!res.error) {
        console.log("KHONG CO ERROR");
        const newList = sensorList.map((item: SensorProps) => {
          if(item.id === sensorData.id) {
            const updatedItem: SensorProps = {
              ...item,
              ...res.payload,
            }
            return updatedItem;
          }
          return item;
        })
        setSensorList(newList);
      }
    });
  };


  return (
    <div className="border-[#B4BECF] border rounded p-2 ">
      <div
        onClick={() => setSelectedSensorId(sensorData.id)}
        className={`${selectedSensorId === sensorData.id ? 'bg-[#EFEDFD] border-primary ' : 'bg-white border-[#B4BECF] hover:bg-gray-100'
          } max-w-[200px] max-h-[200px] border bg-[#EFEDFD] p-4 rounded cursor-pointer transition`}
      >
        <p className={`${selectedSensorId === sensorData.id ? 'text-primary' : 'text-[#424856]'
          } font-semibold text-black text-t7 text-center `}
        >{getSensorLabel(sensorData.type)}</p>
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
            <>
              No Data
            </>
          )}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between py-2 min-w-[200px]'>
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
          {errors?.min?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Min is required</p>
          )}
        </div>
        <div className='flex items-center justify-between py-2 max-w-[200px]'>
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
          {errors?.max?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Max is required</p>
          )}
        </div>
        <button type="submit" className="w-full text-white bg-primary text-t3 font-medium py-1 rounded-[6px]">
          Save
        </button>
      </form>
    </div>
  );
};

export default LoRaType;
