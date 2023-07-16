import { useEffect, useState } from 'react';

// ** libs
import { getSensorOfTypeIntervalDataVer2 } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

interface FilterProps {
  setChartData: any;
}

const Filter: React.FC<FilterProps> = (props) => {
  const { setChartData } = props;
  const [selectedType, setSelectedType] = useState("TEMPERATURE");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getSensorOfTypeIntervalDataVer2(selectedType)).then((res: any) => {
        const payload: Map<string, number[][]> = res.payload;
        setChartData(payload);
      });
    };
    fetchData();
    const handler = setInterval(fetchData, 10000);
    return () => clearInterval(handler);
  }, [selectedType]);

  return (
    <div className="mt-2 flex justify-end gap-2">
      {/* temperature */}
      <div>
        <select
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
          className={`block md:w-[140px] w-full h-[34px] pl-[10px] text-t3 sm:text-t3 mb-[5px] font-poppins border rounded-[5px] focus:outline-primary`}
        >
          <option value="TEMPERATURE">Temperature</option>
          <option value="LIGHT">Light</option>
          <option value="HUMIDITY">Humidity</option>
          <option value="SMOKE">Smoke</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
