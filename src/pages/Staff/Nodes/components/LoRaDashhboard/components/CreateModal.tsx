import { Modal } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createNodes, editNodes } from 'src/redux/slices/nodeSlice';
import { useAppDispatch } from 'src/redux/store/hooks';

interface FormProps {
  setOpenModal: any;
  setUpdateData: any;
  editData: any;
}

const Form: React.FC<FormProps> = (props) => {
  const { setOpenModal, setUpdateData, editData } = props;
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
        name: data.name,
        description: data.description,
      };
      dispatch(editNodes(req)).then(() => {
        setOpenModal(false);
        setUpdateData((prev: boolean) => !prev);
      });
    } else {
      dispatch(createNodes(data)).then(() => {
        setOpenModal(false);
        setUpdateData((prev: boolean) => !prev);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* nodeid */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Node Code</label>
        <input
          disabled={editData}
          type="text"
          className={`block w-full h-[36px] ${errors?.nodeCode ? 'mb-[5px]' : 'mb-[10px]'} ${
            editData ? 'cursor-not-allowed' : ''
          } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('nodeCode', {
            required: true,
          })}
        />
        {errors?.nodeCode?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Node Code is required</p>}
      </>
      {/* name */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Name</label>
        <input
          type="text"
          className={`block w-full h-[36px] ${
            errors?.name ? 'mb-[5px]' : 'mb-[10px]'
          } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('name', {
            required: true,
          })}
        />
        {errors?.name?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Name is required</p>}
      </>
      {/* description */}
      <>
        <label className="text-t3 font-semibold text-[#424856]">Description</label>
        <input
          type="text"
          className={`block w-full h-[36px] ${
            errors?.description ? 'mb-[5px]' : 'mb-[10px]'
          } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('description', {
            required: true,
          })}
        />
        {errors?.description?.type === 'required' && (
          <p className="mb-[5px] text-danger text-[14px]">Description is required</p>
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
}

const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { openModal, setOpenModal, setUpdateData, editData } = props;
  const [editNodeData, setEditNodeData] = useState<any>();

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
  top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-[400px] w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">
          {editData ? 'Edit nodes' : 'Create new nodes'}
        </div>
        {/* body */}
        <div className="px-[25px] my-3">
          <Form setOpenModal={setOpenModal} setUpdateData={setUpdateData} editData={editData} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
