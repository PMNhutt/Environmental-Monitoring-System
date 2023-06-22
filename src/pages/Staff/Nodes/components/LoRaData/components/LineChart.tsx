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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSensorIntervalData } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

ChartJs.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
)

interface ChartProps {
  selectedSensorId: string;
}

const LineChart: React.FC<ChartProps> = (props) => {
  const { selectedSensorId } = props;
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedSensorId !== null && selectedSensorId !== undefined && selectedSensorId !== '') {
        dispatch(getSensorIntervalData(selectedSensorId)).then((res: any) => {
          setLabels(res.payload.createTimestamp);
          setDatasets(res.payload.data);
        });
      }
    }
    fetchData();

    const handler = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(handler);
  }, [selectedSensorId]);

  const data: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: 'Test',
        data: datasets,
        fill: true,
        backgroundColor: 'rgba(83,92,232,0.2)',
        borderColor: '#535CE8',
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
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} style={{ maxWidth: '100%', height: '400px' }} />
    </div>
  );
};

export default LineChart;
