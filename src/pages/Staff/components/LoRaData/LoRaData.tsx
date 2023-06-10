import { useState, useEffect } from 'react';
import LineChart from './components/LineChart';

const data = [
  { id: crypto.randomUUID(), degree: 25 },
  { id: crypto.randomUUID(), degree: 26 },
  { id: crypto.randomUUID(), degree: 24 },
  { id: crypto.randomUUID(), degree: 30 },
  { id: crypto.randomUUID(), degree: 38 },
  { id: crypto.randomUUID(), degree: 33 },
  { id: crypto.randomUUID(), degree: 30 },
];

const LoRaData = () => {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    setChartData(data.map((item) => item.degree));
  }, []);

  return (
    <div className="my-12">
      {/* header */}
      <div>
        <button className="text-[#8792AB] text-t4 mb-4">{`< Back to Personal Space`}</button>
        <h1 className="text-t7 font-semibold">Living room sensors</h1>
      </div>

      {/* body */}
      <div className="w-full flex justify-center my-7">
        <div className="w-[85%]">{chartData?.length > 0 && <LineChart dataLabel="Celsius" loRaData={chartData} />}</div>
      </div>
    </div>
  );
};

export default LoRaData;
