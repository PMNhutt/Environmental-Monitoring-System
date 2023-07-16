import { useEffect, useMemo, useState } from 'react';

//** components */
import { useParams } from 'react-router-dom';
import { getNodeAlertList, getSensors } from 'src/redux/slices/loraDataSlice';
import { getNode } from 'src/redux/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import { SensorProps } from 'src/utils/interface';
import ChangeLog from './components/ChangeLog';
import CreateModal from './components/CreateModal';
import LineChart from './components/LineChart';
import LoRaType from './components/LoRaType';
import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';
// ** assets
import plus from 'src/assets/images/plus_white.svg';
import pin from 'src/assets/images/pin.png';

import '@goongmaps/goong-js/dist/goong-js.css';

const LoRaData = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [sensorList, setSensorList] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [editSensorData, setEditSensorData] = useState();
  const [nodeName, setNodeName] = useState();
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // const [min, setMin] = useState(0);
  // const [max, setMax] = useState(0);
  // const [avg, setAvg] = useState(0);
  const params = useParams();
  const nodeId = params.id;
  const dispatch = useAppDispatch();
  const [data, setData] = useState([
    {
      name: 'place 1',
      longitude: 106.6525115,
      latitude: 10.7596269,
    },
    {
      name: 'place 2',
      longitude: 106.63426645500004,
      latitude: 10.769253775000038,
    },
    {
      name: 'place 3',
      longitude: 106.66048396400004,
      latitude: 10.835563540000066,
    },
    {
      name: 'place 4',
      longitude: 106.63531267900004,
      latitude: 10.749946617000035,
    },
  ]);
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 });
  const [totalItem, setTotalItem] = useState(0);

  const [viewport, setViewport] = useState({
    longitude: 106.70105355500004,
    latitude: 10.776553100000058,
    zoom: 11,
  });

  // Only rerender markers if props.data has changed
  const markers = useMemo(
    () =>
      data.map((city) => (
        <Marker key={city.name} longitude={city.longitude} latitude={city.latitude}>
          <img src={pin} className="w-[50px]" />
        </Marker>
      )),
    [data],
  );

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPagination({ ...pagination, offset: page - 1 });
  };

  useEffect(() => {
    if (nodeId) {
      dispatch(getSensors(nodeId)).then((res: any) => {
        const sensorList = res.payload.data;
        setSensorList(sensorList);
        if (sensorList.length >= 1) {
          setSelectedSensorId(sensorList[0].id);
        }
      });

      const requestData = {
        nodeId,
        offset: pagination.offset,
        limit: pagination.limit,
      };

      dispatch(getNodeAlertList(requestData)).then((res: any) => {
        const alertList = res.payload.data;
        setTotalItem(Math.round((res.payload.count + pagination.limit - 1) / pagination.limit));
        setAlertList(alertList);
      });
    }
  }, [updateData, pagination]);

  useEffect(() => {
    dispatch(getNode(nodeId)).then((res: any) => {
      setNodeName(res.payload.name);
    });
  }, []);

  return (
    <>
      {openModal && (
        <CreateModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setUpdateData={setUpdateData}
          editData={editSensorData}
          nodeId={nodeId}
        />
      )}
      <div className="my-12 mx-14 mt-5">
        {/* header */}
        <div>
          <button onClick={() => history.back()} className="text-[#8792AB] text-t4 mb-4">{`${
            currentUser.role == 'USER' ? '< Back to Personal Space' : '< Back to Node List'
          } `}</button>
          <h1 className="text-t7 font-semibold">{nodeName}</h1>
        </div>
        {/* body */}
        <div className="w-full flex flex-col items-center justify-center my-7">
          {/* chart */}
          <div className="w-[95%] border-[#333333] border rounded p-4">
            <LineChart selectedSensorId={selectedSensorId} />
          </div>
          {/* data type component */}
          <div className="sm:w-[95%] w-[100%] pt-2">
            <div className="flex justify-between">
              <div className="flex h-fit">
                {/* <p className="p-2 mr-2 border-primary border rounded-[8px] text-t3">
                Min: {min}
              </p>
              <p className="p-2 mr-2 border-primary border rounded-[8px] text-t3">
                Max: {max}
              </p>
              <p className="p-2 border-primary border rounded-[8px] text-t3">
                Average: {avg}
              </p> */}
              </div>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setEditSensorData(undefined);
                }}
              >
                <div className="rounded-full bg-primary hover:bg-primary-400 w-[50px] h-[50px] flex justify-center items-center">
                  <img src={plus} className="object-cover w-[25px] h-[25px]" />
                </div>
              </button>
            </div>
          </div>
          <div className="mt-5 mb-5 flex flex-wrap gap-12 justify-center w-[95%]">
            {sensorList.length > 0 ? (
              <>
                {sensorList.map((sensor: SensorProps) => (
                  <div key={sensor.id}>
                    <LoRaType
                      setEditSensorData={setEditSensorData}
                      setOpenEditModal={setOpenModal}
                      setUpdateData={setUpdateData}
                      sensorData={sensor}
                      setSelectedSensorId={setSelectedSensorId}
                      selectedSensorId={selectedSensorId}
                      setSensorList={setSensorList}
                      sensorList={sensorList}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {currentUser.role == 'USER' && (
                  <p className="my-5 font-medium text-danger">
                    No sensors have been configure yet, Please reach out to our staff for asistance
                  </p>
                )}
              </>
            )}
          </div>

          {/* map display */}
          <div>
            <ReactMapGL
              {...viewport}
              width="80vw"
              height="400px"
              onViewportChange={setViewport}
              goongApiAccessToken={import.meta.env.VITE_TILESMAP_API}
            >
              {markers}
            </ReactMapGL>
          </div>
          {/* change log */}
          <div className="w-full my-8">
            <ChangeLog
              alertList={alertList}
              onChange={handleChangePage}
              pageIndex={pagination.offset}
              totalPage={totalItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoRaData;
