import { useEffect, useState } from 'react';

//** components */
import { useParams } from 'react-router-dom';
import { getNodeAlertList, getNodePermission, getSensors } from 'src/redux/slices/loraDataSlice';
import { getNode, sendFanSignal, sendLightBulbSignal, sendSprinklerSignal } from 'src/redux/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import { SensorProps } from 'src/utils/interface';
import ChangeLog from './components/ChangeLog';
import CreateModal from './components/CreateModal';
import LineChart from './components/LineChart';
import LoRaType from './components/LoRaType';
// ** assets
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import fan from 'src/assets/images/fan.svg';
import light_bulb from 'src/assets/images/light_bulb.svg';
import plus from 'src/assets/images/plus_white.svg';
import sprinker from 'src/assets/images/sprinker.svg';

const LoRaData = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [sensorList, setSensorList] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [editSensorData, setEditSensorData] = useState();
  const [nodeName, setNodeName] = useState();
  const [permission, setPermission] = useState<string>('');
  const [samplingValue, setSamplingValue] = useState<number>(1);
  const [tmpSamplingValue, setTmpSamplingValue] = useState<number>(1);
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [selectedSensorMinThreshold, setSelectedSensorMinThreshold] = useState(0);
  const [selectedSensorMaxThreshold, setSelectedSensorMaxThreshold] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  // const [min, setMin] = useState(0);
  // const [max, setMax] = useState(0);
  // const [avg, setAvg] = useState(0);
  const params = useParams();
  const nodeId = params.id;
  const dispatch = useAppDispatch();
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 });
  const [totalItem, setTotalItem] = useState(0);

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

      dispatch(getNodePermission(nodeId)).then((res: any) => {
        setPermission(res.payload);
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


  const handleSensSprinklerSignal = () => {
    dispatch(sendSprinklerSignal(nodeId as string)).then(() => {
    });
  };

  const handleSendFanSignal = () => {
    dispatch(sendFanSignal(nodeId as string)).then(() => {
    });
  };

  const handleSendLightBulbSignal = () => {
    dispatch(sendLightBulbSignal(nodeId as string)).then(() => {
    });
  };

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
          <button onClick={() => history.back()} className="text-[#8792AB] text-t4 mb-4">{`${currentUser.role == 'USER' ? '< Back to Personal Space' : '< Back to Nodes List'
            } `}</button>
          <h1 className="text-t7 font-semibold">{nodeName}</h1>
        </div>
        {/* body */}
        <div className="w-full flex flex-col items-center justify-center my-7">
          {/* chart */}
          <div className="w-[95%] border-[#333333] border rounded p-4">
            <LineChart
              samplingValue={samplingValue}
              selectedSensorId={selectedSensorId}
              selectedSensorMinThreshold={selectedSensorMinThreshold}
              selectedSensorMaxThreshold={selectedSensorMaxThreshold}
            />
          </div>
          {/* data type component */}
          <div className="sm:w-[95%] w-[100%] pt-2">
            <div className="flex justify-between">
              <div className="flex h-fit">
                <input
                  // value={samplingValue}
                  onChange={(e) => setTmpSamplingValue(e.target.valueAsNumber)}
                  type="number"
                  id="sampling"
                  className="block w-full sm:w-[100px] p-[8px] pl-[10px] text-t3 rounded-[6px] border border-[#D9D9D9] focus:outline-primary "
                  placeholder={'Sampling'}
                />
                <button
                  onClick={() => {
                    if(!isNaN(tmpSamplingValue)) {
                      setSamplingValue(tmpSamplingValue);
                    } else {
                      toast.error('Invalid Value!');
                    }
                  }}
                  className="rounded-[6px] ml-2 text-t3 bg-primary text-white font-medium py-1 px-3 flex items-center gap-2 mr-2"
                >
                  Sample
                </button>
              </div>
              <div className='flex gap-2'>
                {permission === 'ACTION' && (
                  <>
                    <Tooltip title={'Send light bulb signal'} placement="top">
                      <button
                        onClick={() => {
                          handleSendLightBulbSignal();
                        }}
                      >
                        <div className="rounded-full bg-primary hover:bg-primary-400 w-[50px] h-[50px] flex justify-center items-center">
                          <img src={light_bulb} className="object-cover w-[34px] h-[34px]" />
                        </div>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Send sprinkler signal'} placement="top">
                      <button
                        onClick={() => {
                          handleSensSprinklerSignal();
                        }}
                      >
                        <div className="rounded-full bg-primary hover:bg-primary-400 w-[50px] h-[50px] flex justify-center items-center">
                          <img src={sprinker} className="object-cover w-[34px] h-[34px]" />
                        </div>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Send Fan signal'} placement="top">
                      <button
                        onClick={() => {
                          handleSendFanSignal();
                        }}
                      >
                        <div className="rounded-full bg-primary hover:bg-primary-400 w-[50px] h-[50px] flex justify-center items-center">
                          <img src={fan} className="object-cover w-[34px] h-[34px]" />
                        </div>
                      </button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5 flex flex-wrap gap-12 justify-center w-[95%]">
            {currentUser.role == 'STAFF' && sensorList.length < 4 && (
              <button
                onClick={() => {
                  setOpenModal(true);
                  setEditSensorData(undefined);
                }}
                className="rounded-[6px] transition hover:bg-[#F3F4F6] flex flex-col justify-center items-center
                 w-[243.19px] h-[365.89px] border-2 border-dashed border-gray-300 text-t4 font-medium text-black"
              >
                <div className="rounded-full bg-primary w-[60px] h-[60px] mb-[24px] flex justify-center items-center">
                  <img src={plus} className="object-cover w-[30px] h-[30px]" />
                </div>
                Create a new Sensor
              </button>
            )}
            {sensorList.length > 0 ? (
              <>
                {sensorList.map((sensor: SensorProps) => (
                  <div key={sensor.id}>
                    <LoRaType
                      permission={permission}
                      setEditSensorData={setEditSensorData}
                      setOpenEditModal={setOpenModal}
                      setUpdateData={setUpdateData}
                      sensorData={sensor}
                      setSelectedSensorId={setSelectedSensorId}
                      setSelectedSensorMinThreshold={setSelectedSensorMinThreshold}
                      setSelectedSensorMaxThreshold={setSelectedSensorMaxThreshold}
                      selectedSensorId={selectedSensorId}
                      setSensorList={setSensorList}
                      sensorList={sensorList}
                      currentUser={currentUser}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {currentUser.role == 'USER' && (
                  <p className="my-5 font-medium text-danger">
                    No sensors have been configure yet, Please reach out to our staff for assistance
                  </p>
                )}
              </>
            )}
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
