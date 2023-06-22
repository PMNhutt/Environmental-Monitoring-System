import { useEffect, useState } from 'react';

//** components */
import { useParams } from 'react-router-dom';
import { getSensors } from 'src/redux/slices/loraDataSlice';
import { getNode } from 'src/redux/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import { SensorProps } from 'src/utils/interface';
import LineChart from './components/LineChart';
import LoRaType from './components/LoRaType';
import SensorList from './components/SensorList';

const LoRaData = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [sensorList, setSensorList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [editSensorData, setEditSensorData] = useState();
  const [nodeName, setNodeName] = useState();
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const params = useParams();
  const nodeId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nodeId) {
      dispatch(getSensors(nodeId)).then((res: any) => {
        setSensorList(res.payload.data);
      });
    }
  }, [updateData]);

  useEffect(() => {
    dispatch(getNode(nodeId)).then((res: any) => {
      setNodeName(res.payload.name);
    });
  }, []);

  return (
    <div className="my-12 mx-14 mt-5">
      {/* header */}
      <div>
        <button
          onClick={() => history.back()}
          className="text-[#8792AB] text-t4 mb-4"
        >{`< Back to Personal Space`}</button>
        <h1 className="text-t7 font-semibold">{nodeName}</h1>
      </div>

      {/* body */}
      <div className="w-full flex flex-col items-center justify-center my-7">
        {/* chart */}
        <div className="sm:w-[95%] w-[100%] border-[#333333] border rounded p-4">
          <LineChart selectedSensorId={selectedSensorId}/>
        </div>
        {/* data type component */}
        <div className="mt-10 mb-20 flex flex-wrap gap-10 justify-center w-full">
          {sensorList.length > 0 ? (
            <>
              {sensorList.map((sensor: SensorProps) => (
                <div key={sensor.id}>
                  <LoRaType sensorData={sensor} setSelectedSensorId={setSelectedSensorId} />
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
        {/* sensor list */}
        <div className="w-full">
          <SensorList
            currentUser={currentUser}
            sensorList={sensorList}
            setUpdateData={setUpdateData}
            editSensorData={editSensorData}
            setEditSensorData={setEditSensorData}
            nodeId={nodeId}
          />
        </div>
      </div>
    </div>
  );
};

export default LoRaData;
