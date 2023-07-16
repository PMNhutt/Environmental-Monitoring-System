/* eslint-disable @typescript-eslint/no-unused-vars */
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import React, { useEffect } from 'react';


interface ChartProps {
  chartOptions: Highcharts.Options;
  setChartOptions: any;
  chartData: Map<string, number[][]>;
}

const LineChart: React.FC<ChartProps> = (props) => {
  const { chartOptions, setChartOptions, chartData } = props;

  useEffect(() => {
    setChartOptions({
      series: Object.entries(chartData).map(([key, value]): any => ({
        type: 'line',
        name: key,
        data: value, // Replace with your actual data
        tooltip: {
          valueDecimals: 2
        },
        showInNavigator: true
      })),
    });
  }, [chartData]);

  return (
    <>
      <div className="border border-[#333333] p-4 w-[100%]">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={chartOptions}
        />
      </div>
    </>
  );
};

export default LineChart;
