
import { useEffect, useState } from 'react';
import { getSensorIntervalLatestData } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';
import { LoRaTypeProps } from 'src/utils/interface';

const LoRaType: React.FC<LoRaTypeProps> = (props) => {
  const { sensorData, setSelectedSensorId } = props;
  const [latestData, setLatestData] = useState(0);
  const [level, setLevel] = useState("");
  const dispatch = useAppDispatch();

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

  return (
    <div
      onClick={() => setSelectedSensorId(sensorData.id)}
      className="min-w-[200px] min-h-[200px] border-[#B4BECF] border bg-white p-4 rounded cursor-pointer transition hover:bg-gray-100"
    >
      <p className="font-semibold text-black text-t7 text-center">{getSensorLabel(sensorData.type)}</p>
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
  );
};

export default LoRaType;
