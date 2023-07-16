import { useEffect, useState } from 'react';
import { getAllSensors } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import Filter from './Filter';
import LineChart from './LineChart';
import SensorList from './SensorList';

const SensorDashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [sensorList, setSensorList] = useState([]);
  const [chartData, setChartData] = useState<Map<string, number[][]>>(new Map());
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
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
          hover: {},
          select: {
            fill: '#039',
            style: {
              color: 'white',
            },
          },
        },
      },
      selected: 2,
      buttons: [
        {
          type: 'day',
          count: 1,
          text: 'Day',
        },
        {
          type: 'week',
          count: 1,
          text: 'Week',
        },
        {
          type: 'month',
          count: 1,
          text: 'Month',
        },
      ],
    },
    scrollbar: {
      barBorderRadius: 0,
      barBorderWidth: 1,
      buttonsEnabled: true,
      height: 14,
      margin: 0,
      rifleColor: '#333',
      trackBackgroundColor: '#f2f2f2',
      trackBorderRadius: 0,
    },
    series: [
      {
        type: 'line',
        name: 'Stock Price',
        data: [], // Replace with your actual data
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  });
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 });
  const [totalItem, setTotalItem] = useState(0);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPagination({ ...pagination, offset: page - 1 });
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    const requestData = {
      offset: pagination.offset,
      limit: pagination.limit,
    };
    dispatch(getAllSensors(requestData)).then((res: any) => {
      const sensorList = res.payload.data;
      setTotalItem(Math.round((res.payload.count + pagination.limit - 1) / pagination.limit));
      setSensorList(sensorList);
    });
  }, [pagination]);

  return (
    <div className="my-12 mx-14">
      {/* body */}
      <div className="w-full flex items-center justify-between my-7">
        {/* chart */}
        <LineChart setChartOptions={setChartOptions} chartOptions={chartOptions} chartData={chartData} />
      </div>
      {/* filter */}
      <Filter setChartData={setChartData} />
      {/* sensor list */}
      <SensorList
        currentUser={currentUser}
        sensorList={sensorList}
        setSensorList={setSensorList}
        setUpdateData={'setUpdateData'}
        editSensorData={'editSensorData'}
        setEditSensorData={'setEditSensorData'}
        nodeId={'nodeId'}
        onChange={handleChangePage}
        pageIndex={pagination.offset}
        totalPage={totalItem}
      />
    </div>
  );
};

export default SensorDashboard;
