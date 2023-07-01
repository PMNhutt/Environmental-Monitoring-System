import { useEffect, useState } from 'react';
import { getAllSensors } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import Filter from './Filter';
import LineChart from './LineChart';
import SensorList from './SensorList';

const SensorDashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [chartData, setChartData] = useState<any>([]);
  const [sensorList, setSensorList] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSensors()).then((res: any) => {
      const sensorList = res.payload.data;
      console.log(sensorList);
      setSensorList(sensorList);
    });
  }, []);

  return (
    <div className="my-12 mx-14">
      {/* body */}
      <div className="w-full flex items-center justify-between my-7">
        {/* chart */}
        <LineChart dataLabel={'sensor 1'} loRaData={chartData} />
      </div>
      {/* filter */}
      <Filter />
      {/* sensor list */}
      <SensorList
        currentUser={currentUser}
        sensorList={sensorList}
        setSensorList={setSensorList}
        setUpdateData={'setUpdateData'}
        editSensorData={'editSensorData'}
        setEditSensorData={'setEditSensorData'}
        nodeId={'nodeId'}
      />
    </div>
  );
};

export default SensorDashboard;
