import { Autocomplete, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllLocationsVer2 } from 'src/redux/slices/loraDataSlice';
import { createNodes, editNodes } from 'src/redux/slices/nodeSlice';
import { useAppDispatch } from 'src/redux/store/hooks';
import { LocationProps } from 'src/utils/interface';
interface FormProps {
  setOpenModal: any;
  setUpdateData: any;
  editData: any;
}

const Form: React.FC<FormProps> = (props) => {
  const { setOpenModal, setUpdateData, editData } = props;
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<LocationProps[]>([
    {
      id: "",
      name: "None",
      address: "None",
      createdDate: "",
      latitude: 0,
      longitude: 0,
      updatedDate: "",
    }
  ]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    const params = {
      search: "",
    }
    dispatch(getAllLocationsVer2(params)).then((res: any) => {
      const locationOptionList = res.payload.data;
      setOptions(options.concat(locationOptionList));
    });
  }, []);

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
        locationId: selectedLocation === '' ? null : selectedLocation,
      };
      const locationObject = options.find((option) => option.id === selectedLocation);
      if (locationObject) {
        dispatch(editNodes(req)).then((res: any) => {
          if (!res.error) {
            setOpenModal(false);
            setUpdateData((prev: boolean) => !prev);
          }
        });
      }
      else {
        setLocationError(true);
      }

    } else {
      const req = {
        ...data,
        locationId: selectedLocation === '' ? null : selectedLocation,
      };
      dispatch(createNodes(req)).then((res: any) => {
        if (!res.error) {
          setOpenModal(false);
          setUpdateData((prev: boolean) => !prev);
        }
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
          className={`block w-full h-[36px] ${errors?.nodeCode ? 'mb-[5px]' : 'mb-[10px]'} ${editData ? 'cursor-not-allowed' : ''
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
          className={`block w-full h-[36px] ${errors?.name ? 'mb-[5px]' : 'mb-[10px]'
            } p-[12px] text-t3 sm:text-t3 font-poppins bg-[#F3F4F6] rounded-[5px] focus:outline-primary`}
          {...register('name', {
            required: true,
          })}
        />
        {errors?.name?.type === 'required' && <p className="mb-[5px] text-danger text-[14px]">Name is required</p>}
      </>
      {/* location */}
      <>
        <div className='relative'>
          <label className="text-t3 font-semibold text-[#424856]">Location</label>
          <Autocomplete
            disabled={editData}
            sx={{
              // display: 'inline-block',
              '& input': {
                display: 'block',
                width: '100%',
                height: '36px',
                marginBottom: errors?.location ? '5px' : '10px',
                padding: '12px',
                fontSize: '0.875rem',
                lineHeight: '1.375rem',
                fontFamily: 'Poppins',
                bgcolor: '#F3F4F6',
                borderRadius: '5px'
              },
            }}
            id="custom-input-demo"
            options={options}
            defaultValue={editData && editData.locations ? editData.locations : options[0]}
            clearOnBlur={false}
            onChange={(_, newValue: LocationProps | null) => {
              setSelectedLocation(newValue ? newValue.id : '');
            }}
            getOptionLabel={(option) => (option.name + " - " + option.address)}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input type="text"
                  {...params.inputProps} />
              </div>
            )}
          />
          {locationError && (
            <p className="mb-[5px] text-danger text-[14px]">You should choose a valid option</p>
          )}
        </div>
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
          {editData ? 'Edit nodes' : 'Create a new node'}
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
