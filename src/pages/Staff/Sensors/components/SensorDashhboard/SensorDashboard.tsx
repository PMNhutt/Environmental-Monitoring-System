import { useEffect, useState } from 'react';
import LineChart from './LineChart';

const SensorDashboard = () => {
  const [chartData, setChartData] = useState<any>([]);

  return (
    <div className="my-12 mx-14">
      {/* body */}
      <div className="w-full flex flex-col items-center justify-center my-7">
        {/* chart */}
        <div className="sm:w-[85%] w-[100%]">
          <LineChart dataLabel={'sensor 1'} loRaData={chartData} />
        </div>
        {/* filter */}

        {/* sensor list */}
        <div></div>
      </div>
    </div>
  );
};

export default SensorDashboard;
