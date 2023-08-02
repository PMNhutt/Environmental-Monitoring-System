import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import React, { useEffect, useState } from 'react';
import { getSensorEventData, getSensorIntervalData } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

interface ChartProps {
  samplingValue: number;
  selectedSensorId: string;
  selectedSensorMaxThreshold: number;
  selectedSensorMinThreshold: number;
}

const LineChart: React.FC<ChartProps> = (props) => {
  const dispatch = useAppDispatch();
  const { selectedSensorId, selectedSensorMaxThreshold, selectedSensorMinThreshold, samplingValue } = props;
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>(
    {
      chart: {
        height: '500px',
      },
      xAxis: {
        minRange: 1,
      },
      rangeSelector: {
        buttonTheme: {
          fill: 'none',
          stroke: 'none',
          'stroke-width': 0,
          r: 8,
          style: {
            color: '#039',
            fontWeight: 'bold',
            padding: '100',
          },
          width: 40,
          states: {
            hover: {
            },
            select: {
              fill: '#039',
              style: {
                color: 'white'
              }
            }
          }
        },
        selected: 1,
        buttons: [{
          type: 'day',
          count: 1,
          text: 'Day',
        }, {
          type: 'week',
          count: 1,
          text: 'Week',
        }, {
          type: 'month',
          count: 1,
          text: 'Month',
        }],
      },
      scrollbar: {
        barBorderRadius: 0,
        barBorderWidth: 1,
        buttonsEnabled: true,
        height: 14,
        margin: 0,
        rifleColor: '#333',
        trackBackgroundColor: '#f2f2f2',
        trackBorderRadius: 0
      },
      series: [
        {
          type: 'line',
          name: 'Stock Price',
          data: [], // Replace with your actual data
          tooltip: {
            valueDecimals: 2
          }
        },
      ],
    });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedSensorId !== null && selectedSensorId !== undefined && selectedSensorId !== '') {
        let chartData1: number[][] = [];
        let chartData2: number[][] = [];
        const params = {
          sampling: samplingValue
        }
        dispatch(getSensorIntervalData({sensorId: selectedSensorId, params})).then((res: any) => {
          const chartData1 = res.payload;
          dispatch(getSensorEventData(selectedSensorId)).then((res: any) => {
            const chartData2 = res.payload;
            setChartOptions({
              series: [
                {
                  type: 'line',
                  name: 'Temperature',
                  data: chartData1, // Replace with your actual data
                  tooltip: {
                    valueDecimals: 2
                  }
                },
                {
                  type: 'scatter',
                  name: 'Temperature',
                  data: chartData2, // Replace with your actual data
                  tooltip: {
                    valueDecimals: 1,
                    pointFormatter: function (this: Highcharts.Point) {
                      return '' + this.y?.toFixed(1) + " " + getLevel(selectedSensorMinThreshold, selectedSensorMaxThreshold, this.y? this.y : 0); // Show only the x-axis value in the tooltip
                    },
                  },
                  marker: {
                    symbol: 'line', // Use 'line' symbol for the markers (vertical lines)
                    lineWidth: 2, // Set the width of the vertical lines
                  },
                  color: '#de3b40',
                  // pointWidth: 1,
                },
              ],
            });
          });
        });
      }
    }
    fetchData();
    const handler = setInterval(fetchData, 10000);
    return () => clearInterval(handler);
  }, [selectedSensorId, samplingValue]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

const getLevel = (min: number, max: number, resData: number) => {
  const maxThreshold = max;
  const minThreshold = min;
  const thresholdRange = maxThreshold - minThreshold;
  const lowThreshold = minThreshold - (thresholdRange * 0.2);
  const veryLowThreshold = minThreshold - (thresholdRange * 0.6);
  const highThreshold = maxThreshold + (thresholdRange * 0.2);
  const veryHighThreshold = maxThreshold + (thresholdRange * 0.6);
  if (resData < veryLowThreshold) {
    return 'Extremely Low';
  } else if (resData >= veryLowThreshold && resData < lowThreshold) {
    return 'Very Low';
  } else if (resData >= lowThreshold && resData < minThreshold) {
    return 'Low';
  } else if (resData >= minThreshold && resData <= maxThreshold) {
    return 'Normal';
  } else if (resData > maxThreshold && resData <= highThreshold) {
    return 'High';
  } else if (resData > highThreshold && resData <= veryHighThreshold) {
    return 'Very High';
  } else if (resData > veryHighThreshold) {
    return 'Extremely High';
  } else if (resData === undefined) {
    return '';
  }
}

export default LineChart;
