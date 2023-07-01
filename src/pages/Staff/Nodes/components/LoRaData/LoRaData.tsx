import { useEffect, useState } from 'react';

//** components */
import { useParams } from 'react-router-dom';
import { getSensors } from 'src/redux/slices/loraDataSlice';
import { getNode } from 'src/redux/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import { SensorProps } from 'src/utils/interface';
import ChangeLog from './components/ChangeLog';
import CreateModal from './components/CreateModal';
import LineChart from './components/LineChart';
import LoRaType from './components/LoRaType';
// ** assets
import plus from 'src/assets/images/plus_white.svg';

const LoRaData = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [sensorList, setSensorList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [editSensorData, setEditSensorData] = useState();
  const [nodeName, setNodeName] = useState();
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const nodeId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nodeId) {
      dispatch(getSensors(nodeId)).then((res: any) => {
        const sensorList = res.payload.data;
        setSensorList(sensorList);
        if (sensorList.length >= 1) {
          setSelectedSensorId(sensorList[0].id);
        }
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
        <button onClick={() => history.back()} className="text-[#8792AB] text-t4 mb-4">{`${currentUser.role == 'USER' ? '< Back to Personal Space' : '< Back to Node List'
          } `}</button>
        <h1 className="text-t7 font-semibold">{nodeName}</h1>
      </div>
      {/* body */}
      <div className="w-full flex flex-col items-center justify-center my-7">
        {/* chart */}
        <div className="sm:w-[95%] w-[100%] border-[#333333] border rounded p-4">
          <LineChart selectedSensorId={selectedSensorId} />
        </div>
        {/* data type component */}
        <div className="sm:w-[95%] w-[100%] pt-2">
          <div className="flex justify-between">
            <div className="flex h-fit">
              <p className="p-2 mr-2 border-primary border rounded-[8px] text-t3">
                Min: 20
              </p>
              <p className="p-2 mr-2 border-primary border rounded-[8px] text-t3">
                Max: 20
              </p>
              <p className="p-2 border-primary border rounded-[8px] text-t3">
                Average: 20
              </p>
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
        <div className="mt-5 mb-5 flex flex-wrap gap-10 justify-center w-full">
          {sensorList.length > 0 ? (
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
        {/* change log */}
        <div className="w-full my-8">
          <ChangeLog />
        </div>
      </div>
    </div>
  );
};

export default LoRaData;
