/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const date = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const dp = [25, 26, 24, 30, 38, 33, 30];

const mg = [33, 26, 20, 21, 26, 30, 32];

const celsius = [33, 30, 25, 36, 31, 30, 32];

const water = [27, 32, 25, 36, 31, 30, 28];

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
};

interface ChartProps {
  loRaData: any;
  dataLabel: string;
}

const LineChart: React.FC<ChartProps> = (props) => {
  const { loRaData, dataLabel } = props;
  const [chartData, setChartData] = useState({
    labels: date,
    datasets: [
      {
        // label: dataLabel,
        label: 'Temperature-S-2',
        data: dp,
        fill: false,
        // backgroundColor: 'rgba(83,92,232,0.2)',
        borderColor: '#535CE8',
      },
      {
        label: 'Temperature-S-3',
        data: mg,
        borderColor: '#FFD5C3',
      },
      {
        label: 'Temperature-S-4',
        data: celsius,
        borderColor: '#F84B01',
      },
      {
        label: 'Temperature-S-5',
        data: water,
        borderColor: '#59DBDD',
      },
    ],
  });

  // useEffect(() => {
  //   setChartData({
  //     labels: date,
  //     datasets: [
  //       {
  //         label: dataLabel,
  //         data: loRaData,
  //         fill: true,
  //         // backgroundColor: 'rgba(83,92,232,0.2)',
  //         borderColor: '#535CE8',
  //       },
  //       // {
  //       //   label: 'label2',
  //       //   data: data2,
  //       // },
  //     ],
  //   });
  // }, [loRaData]);

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
