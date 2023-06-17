/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const date = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
        label: dataLabel,
        data: loRaData,
        fill: true,
        backgroundColor: 'rgba(83,92,232,0.2)',
        borderColor: '#535CE8',
      },
      // {
      //   label: 'label2',
      //   data: data2,
      // },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: date,
      datasets: [
        {
          label: dataLabel,
          data: loRaData,
          fill: true,
          backgroundColor: 'rgba(83,92,232,0.2)',
          borderColor: '#535CE8',
        },
        // {
        //   label: 'label2',
        //   data: data2,
        // },
      ],
    });
  }, [loRaData]);

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
