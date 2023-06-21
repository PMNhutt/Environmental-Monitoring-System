import { useEffect, useState } from 'react';

//** components */
import { useParams } from 'react-router-dom';
import { getSensors } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import LineChart from './components/LineChart';
import LoRaType from './components/LoRaType';
import SensorList from './components/SensorList';

const dp = [
  { id: crypto.randomUUID(), degree: 25 },
  { id: crypto.randomUUID(), degree: 26 },
  { id: crypto.randomUUID(), degree: 24 },
  { id: crypto.randomUUID(), degree: 30 },
  { id: crypto.randomUUID(), degree: 38 },
  { id: crypto.randomUUID(), degree: 33 },
  { id: crypto.randomUUID(), degree: 30 },
];

const mg = [
  { id: crypto.randomUUID(), mg: 33 },
  { id: crypto.randomUUID(), mg: 26 },
  { id: crypto.randomUUID(), mg: 20 },
  { id: crypto.randomUUID(), mg: 21 },
  { id: crypto.randomUUID(), mg: 26 },
  { id: crypto.randomUUID(), mg: 30 },
  { id: crypto.randomUUID(), mg: 32 },
];

const celsius = [
  { id: crypto.randomUUID(), celsius: 33 },
  { id: crypto.randomUUID(), celsius: 30 },
  { id: crypto.randomUUID(), celsius: 25 },
  { id: crypto.randomUUID(), celsius: 36 },
  { id: crypto.randomUUID(), celsius: 31 },
  { id: crypto.randomUUID(), celsius: 30 },
  { id: crypto.randomUUID(), celsius: 32 },
];

const water = [
  { id: crypto.randomUUID(), water: 27 },
  { id: crypto.randomUUID(), water: 32 },
  { id: crypto.randomUUID(), water: 25 },
  { id: crypto.randomUUID(), water: 36 },
  { id: crypto.randomUUID(), water: 31 },
  { id: crypto.randomUUID(), water: 30 },
  { id: crypto.randomUUID(), water: 28 },
];

const LoRaData = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [chartData, setChartData] = useState<any>([]);
  const [loRaUnit, setLoRaUnit] = useState('dp');
  const [sensorList, setSensorList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [editSensorData, setEditSensorData] = useState();
  const params = useParams();
  const nodeId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (loRaUnit) {
      case 'dp':
        setChartData(dp.map((item) => item.degree));
        break;
      case 'mg':
        setChartData(mg.map((item) => item.mg));
        break;
      case 'Celsius':
        setChartData(celsius.map((item) => item.celsius));
        break;
      case 'Grams of water':
        setChartData(water.map((item) => item.water));
        break;
      default:
        break;
    }
  }, [loRaUnit]);

  useEffect(() => {
    if (nodeId) {
      dispatch(getSensors(nodeId)).then((res: any) => {
        setSensorList(res.payload.data);
      });
    }
  }, [updateData]);

  return (
    <div className="my-12">
      {/* header */}
      <div>
        <button
          onClick={() => history.back()}
          className="text-[#8792AB] text-t4 mb-4"
        >{`< Back to Personal Space`}</button>
        <h1 className="text-t7 font-semibold">Living room sensors</h1>
      </div>

      {/* body */}
      <div className="w-full flex flex-col items-center justify-center my-7">
        {/* chart */}
        <div className="sm:w-[85%] w-[100%]">
          {chartData?.length > 0 && <LineChart dataLabel={loRaUnit} loRaData={chartData} />}
        </div>
        {/* data type component */}
        <div className="my-20 flex flex-wrap gap-10 justify-center w-full px-32">
          <LoRaType level="High" value={9.1} unit="dp" setLoRaUnit={setLoRaUnit} />
          <LoRaType level="Pretty High" value={20} unit="mg" setLoRaUnit={setLoRaUnit} />
          <LoRaType level="Normal" value={29} unit="Celsius" setLoRaUnit={setLoRaUnit} />
          <LoRaType level="Normal" value={29} unit="Grams of water" setLoRaUnit={setLoRaUnit} />
        </div>
        {/* sensor list */}
        <div className="w-full">
          <SensorList
            currentUser={currentUser}
            sensorList={sensorList}
            setUpdateData={setUpdateData}
            editSensorData={editSensorData}
            setEditSensorData={setEditSensorData}
            nodeId={nodeId}
          />
        </div>
      </div>
    </div>
  );
};

export default LoRaData;
