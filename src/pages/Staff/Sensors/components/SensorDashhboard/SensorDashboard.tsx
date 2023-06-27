import { useEffect, useState } from 'react';
import LineChart from './LineChart';
import Filter from './Filter';
import SensorList from './SensorList';
import { useAppSelector } from 'src/redux/store/hooks';

const SensorDashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [chartData, setChartData] = useState<any>([]);

  return (
    <div className="my-12 mx-14">
      {/* body */}
      <div className="w-full flex flex-col items-center justify-center my-7">
        {/* chart */}
        <div className="sm:w-[85%] w-[100%]">
          <LineChart dataLabel={'sensor 1'} loRaData={chartData} />
        </div>
      </div>
      {/* filter */}
      <Filter />
      {/* sensor list */}
      <SensorList
        currentUser={currentUser}
        sensorList={[]}
        setUpdateData={'setUpdateData'}
        editSensorData={'editSensorData'}
        setEditSensorData={'setEditSensorData'}
        nodeId={'nodeId'}
      />
    </div>
  );
};

export default SensorDashboard;
