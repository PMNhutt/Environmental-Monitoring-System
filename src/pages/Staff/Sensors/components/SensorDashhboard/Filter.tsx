import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// ** libs
import { getSensorOfTypeIntervalDataVer2 } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

interface FilterProps {
  setChartData: any;
}

const Filter: React.FC<FilterProps> = (props) => {
  const { setChartData } = props;
  const [selectedType, setSelectedType] = useState("TEMPERATURE");
  const [samplingValue, setSamplingValue] = useState<number>(1);
  const [tmpSamplingValue, setTmpSamplingValue] = useState<number>(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        sampling: samplingValue
      }
      dispatch(getSensorOfTypeIntervalDataVer2({type: selectedType, params})).then((res: any) => {
        const payload: Map<string, number[][]> = res.payload;
        setChartData(payload);
      });
    };
    fetchData();
    const handler = setInterval(fetchData, 10000);
    return () => clearInterval(handler);
  }, [selectedType, samplingValue]);

  return (
    <div className="mt-2 flex justify-start mb-3">
      {/* temperature */}
      {/* <div> */}
        <input
          // value={samplingValue}
          onChange={(e) => setTmpSamplingValue(e.target.valueAsNumber)}
          type="number"
          id="sampling"
          className="block w-full sm:w-[100px] p-[8px] pl-[10px] text-t3 rounded-[6px] border border-[#D9D9D9] focus:outline-primary "
          placeholder={'Sampling'}
        />
        <button
          onClick={() => {
            if (!isNaN(tmpSamplingValue)) {
              setSamplingValue(tmpSamplingValue);
            } else {
              toast.error('Invalid Value!');
            }
          }}
          className="rounded-[6px] ml-2 text-t3 bg-primary text-white font-medium py-1 px-3 flex items-center gap-2 mr-4"
        >
          Sample
        </button>
        <select
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
          className={`block md:w-[140px] w-full h-[40.19px] pl-[10px] text-t3 sm:text-t3 font-poppins border rounded-[5px] focus:outline-primary`}
        >
          <option value="TEMPERATURE">Temperature</option>
          <option value="LIGHT">Light</option>
          <option value="HUMIDITY">Humidity</option>
          <option value="SMOKE">Smoke</option>
        </select>
      {/* </div> */}
    </div>
  );
};

export default Filter;
