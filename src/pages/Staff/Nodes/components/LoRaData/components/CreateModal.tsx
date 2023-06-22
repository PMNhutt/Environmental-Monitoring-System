import { Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createSensors, editSensors } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

interface FormProps {
  setOpenModal: any;
  setUpdateData: any;
  editData: any;
  nodeId: any;
}

const Form: React.FC<FormProps> = (props) => {
  const { setOpenModal, setUpdateData, editData, nodeId } = props;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: editData });

  // ** handle submit form
  const onSubmit = (data: any) => {
    if (editData) {
      const req = {
        id: editData.id,
        type: data.type,
        power: data.power,
        size: data.size,
        productLine: data.productLine,
        interval: data.interval,
        location: data.location,
      };
      console.log(req);
      dispatch(editSensors(req)).then(() => {
        setOpenModal(false);
        setUpdateData((prev: boolean) => !prev);
      });
    } else {
      dispatch(createSensors({ req: data, nodeId: nodeId })).then(() => {
        setOpenModal(false);
        setUpdateData((prev: boolean) => !prev);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* sensorId and Type */}
      <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Sensor Id</label>
          <input
            disabled={editData}
            type="text"
            className={`block w-full h-[36px] ${errors?.sensorId ? 'mb-[5px]' : 'mb-[10px]'} ${editData ? 'cursor-not-allowed' : ''
              } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('sensorId', {
              required: true,
            })}
          />
          {errors?.sensorId?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Sensor Id is required</p>}
        </div>
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Sensor Type</label>
          <select
            className={`block w-full h-[36px] ${errors?.type ? 'mb-[5px]' : 'mb-[10px]'
              } pl-[10px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register("type", {
              required: true,
            })}>
            <option value="TEMPERATURE">Temperature</option>
            <option value="LIGHT">Light</option>
            <option value="HUMIDITY">Humidity</option>
            <option value="SMOKE">Smoke</option>
          </select>
          {errors?.type?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Type is required</p>
          )}
        </div>
      </div>
      {/* Min Max Threshold */}
      <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Min Threshold</label>
          <input
            type="number"
            disabled={editData}
            className={`block w-full h-[36px] ${errors?.minThreshold ? 'mb-[5px]' : 'mb-[10px]'} ${editData ? 'cursor-not-allowed' : ''
              } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('minThreshold', {
              required: true,
            })}
          />
          {errors?.minThreshold?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Min Threshold required</p>
          )}
        </div>
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Max Threshold</label>
          <input
            type="number"
            disabled={editData}
            className={`block w-full h-[36px] ${errors?.maxThreshold ? 'mb-[5px]' : 'mb-[10px]'} ${editData ? 'cursor-not-allowed' : ''
              } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('maxThreshold', {
              required: true,
            })}
          />
          {errors?.maxThreshold?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Max Threshold required</p>
          )}
        </div>
      </div>
      {/* interval */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Interval</label>
        <input
          type="number"
          className={`block w-full h-[36px] ${errors?.interval ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('interval', {
            required: true,
          })}
        />
        {errors?.interval?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Interval is required</p>
        )}
      </>
      {/* location */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Location</label>
        <input
          type="text"
          className={`block w-full h-[36px] ${errors?.location ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('location', {
            required: false,
          })}
        />
        {errors?.location?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Location is required</p>
        )}
      </>
      {/* Power and Size */}
      <div className="flex sm:gap-5  sm:flex-row flex-col w-full">
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Power</label>
          <input
            type="text"
            className={`block w-full h-[36px] ${errors?.power ? 'mb-[5px]' : 'mb-[10px]'
              } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('power', {
              required: false,
            })}
          />
          {errors?.power?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Power is required</p>
          )}
        </div>
        <div className="w-full">
          <label className="text-t3 font-semibold text-[#424856]">Size</label>
          <input
            type="text"
            className={`block w-full h-[36px] ${errors?.size ? 'mb-[5px]' : 'mb-[10px]'
              } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
            {...register('size', {
              required: false,
            })}
          />
          {errors?.size?.type === 'required' && (
            <p className="mb-[5px] text-danger text-[14px]">Size is required</p>
          )}
        </div>
      </div>
      {/* productLine */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Product Line</label>
        <input
          type="text"
          className={`block w-full h-[36px] ${errors?.productLine ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('productLine', {
            required: false,
          })}
        />
        {errors?.productLine?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Product Line is required</p>
        )}
      </>

      {/* buttons */}
      <div className="flex justify-end items-center gap-4 mt-10">
        <button
          onClick={() => setOpenModal(false)}
          className="border-primary border text-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
        >
          Cancel
        </button>
        <button type="submit" className=" text-white bg-primary text-t3 font-medium px-5 py-1 rounded-[6px]">
          Save
        </button>
      </div>
    </form>
  );
};

interface CreateModalProps {
  openModal: boolean;
  setOpenModal: any;
  setUpdateData: any;
  editData: any;
  nodeId: any;
}

const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { openModal, setOpenModal, setUpdateData, editData, nodeId } = props;

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
  top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-[500px] w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">
          {editData ? 'Edit Sensor' : 'Create new Sensor'}
        </div>
        {/* body */}
        <div className="px-[25px] my-3">
          <Form setOpenModal={setOpenModal} setUpdateData={setUpdateData} editData={editData} nodeId={nodeId} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
