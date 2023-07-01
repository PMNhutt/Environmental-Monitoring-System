/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChartData,
  Chart as ChartJs,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { useAppDispatch } from 'src/redux/store/hooks';
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from 'react';
import { getSensorIntervalData } from 'src/redux/slices/loraDataSlice';

ChartJs.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
)

interface ChartProps {
  loRaData: any;
  dataLabel: string;
}

const LineChart: React.FC<ChartProps> = (props) => {
  const { loRaData, dataLabel } = props;
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getSensorIntervalData('326961e5-143b-4276-90a3-c4031462a09d')).then((res: any) => {
        setLabels(res.payload.createTimestamp);
        setDatasets(res.payload.data);
      });
    }
    fetchData();

    const handler = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(handler);
  }, []);

  const data: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: "TEST",
        data: datasets,
        borderWidth: 1,
        pointRadius: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    // animation: false,
    normalized: true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: 'day',
        },
        ticks: {
          autoSkip: false,
          maxTicksLimit: 10,
          minRotation: 0,
          maxRotation: 0,
          sampleSize: 10,
        },
      },
    },
    // interaction: {
    //   intersect: false,
    // },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxHeight: 15,
          boxWidth: 15,
        }
      },
    },
  };

  return (
    <>
      <div className="border border-[#333333] p-4 w-[100%]">
        <Line
          data={data}
          options={options}
          style={{ maxWidth: '100%', height: '400px' }}
        />
      </div>
    </>
  );
};

export default LineChart;
