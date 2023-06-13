import { Modal } from '@mui/material';
import { ConfirmModalProps } from 'src/utils/interface';

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { openModal, setOpenModal, title, setUpdateData, description } = props;
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
  top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-fit w-full bg-white rounded-[4px] py-4 font-poppins"
      >
        {/* header */}
        <div className="px-[25px] pb-4 border-b border-b-[#F3F4F6] text-t7 font-medium">{title}</div>
        {/* body */}
        <div className="px-[25px] my-3">
          <p className="my-5 md:w-2/3 text-t4 font-semibold">{description}</p>
          {/* buttons */}
          <div className="flex justify-end items-center gap-4 mt-10">
            <button
              onClick={() => setOpenModal(false)}
              className="border-primary border text-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
            >
              Cancel
            </button>
            <button type="submit" className=" text-white bg-primary text-t3 font-medium px-5 py-1 rounded-[6px]">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
