import { IconButton, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import actions from 'src/assets/images/sensorAction.svg';
import sensor from 'src/assets/images/Warehouse.svg';
import { useAppDispatch } from 'src/redux/store/hooks';
import { useOutsideClick } from 'src/share/hooks/useOutSideClick';
import { LocationProps, UsersProps } from 'src/utils/interface';
// ** assets

// ** redux
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteLocation, getLocation } from 'src/redux/slices/loraDataSlice';
import ConfirmModal from 'src/share/components/ConfirmModal';

interface Props {
  currentUser: UsersProps;
  locationList: LocationProps[];
  setLocationList: any;
  setUpdateData: any;
  editLocationData: any;
  setEditLocationData: any;
  totalPage: number;
  pageIndex: number;
  onChange: any;
  setOpenEditModal: any;
}

interface LocationItemProps {
  locationData: any;
  setOpenEditModal: any;
  setUpdateData: any;
  setEditLocationData: any;
  currentUser: UsersProps;
}

const LocationItem: React.FC<LocationItemProps> = (props) => {
  const { locationData, setOpenEditModal, setUpdateData, setEditLocationData, currentUser } = props;
  const [openOptions, setOpenOptions] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useOutsideClick(() => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  const handleDeleteLocation = () => {
    dispatch(deleteLocation(locationData.id)).then(() => {
      setUpdateData((prev: any) => !prev);
      setOpenConfirm(false);
    });
  };

  // handle edit node
  const handleEditLocation = async () => {
    const res = await dispatch(getLocation(locationData.id));
    setOpenEditModal(true);
    setEditLocationData(res.payload);
  };

  return (
    <>
      {openConfirm && (
        <ConfirmModal
          description="Delete this Location?"
          openModal={openConfirm}
          setOpenModal={setOpenConfirm}
          rowData={locationData.id}
          handleConfirm={handleDeleteLocation}
        />
      )}
      <div
        className="w-full flex justify-between items-center pb-2 pt-2 border-b border-b-[#D9D9D9] hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/nodes?locationId=${locationData.id}`)}
      >
        {/* Location name */}
        <div className="flex sm:flex-row flex-col sm:items-center gap-3 w-full">
          <div className="min-w-[133px] h-[68px] bg-[#F3F4F6] border border-[#BDC1CA] flex justify-center items-center">
            <img src={sensor} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <p className="text-t4 font-semibold text-black">{locationData.name}</p>
            <p className="text-t3 font-medium text-[#8792AB]">{locationData.address}</p>
          </div>
        </div>
        {currentUser.role == 'STAFF' && (
          <>
            <div className="relative">
              <Tooltip title={'Options'} placement="top">
                <IconButton
                  disabled={openOptions}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!openOptions) setOpenOptions(true);
                  }}
                >
                  <img src={actions} className="object-contain" />
                </IconButton>
              </Tooltip>
              {/* options menu */}
              <AnimatePresence>
                {openOptions && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    exit={{ opacity: 0 }}
                    ref={ref}
                    className="absolute z-10 top-15 left-[25%] transform translate-x-[-50%] bg-white border shadow-sm rounded-[5px] font-medium text-t3"
                  >
                    <li onClick={(e) => {
                      e.stopPropagation();
                      handleEditLocation();
                    }} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                      Edit
                    </li>
                    <li onClick={(e) => {
                      e.stopPropagation();
                      setOpenConfirm(true)
                    }} className="cursor-pointer py-2 px-3 hover:bg-gray-100">
                      Delete
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const LocationList: React.FC<Props> = (props) => {
  const {
    locationList,
    setUpdateData,
    currentUser,
    editLocationData,
    setEditLocationData,
    onChange,
    pageIndex,
    totalPage,
    setOpenEditModal,
  } = props;

  return (
    <div>
      {/* list */}
      <div className="border border-[#B4BECF] px-5 py-2 rounded my-4">
        {/* label */}
        <div className="flex">
          <div className="w-full justify-between flex">
            <p className="text-t4">Name</p>
            {currentUser.role == 'STAFF' && (
              <>
                <p className="text-t4">Actions</p>
              </>
            )}
          </div>
        </div>
        {/* list sensors */}
        <div className="my-5">
          {locationList.map((location: LocationProps) => (
            <div key={location.id}>
              <LocationItem
                currentUser={currentUser}
                locationData={location}
                setOpenEditModal={setOpenEditModal}
                setUpdateData={setUpdateData}
                setEditLocationData={setEditLocationData}
              />
            </div>
          ))}

          <div className="w-full flex justify-end mt-5">
            <Pagination
              count={totalPage}
              page={pageIndex + 1}
              onChange={onChange}
              shape="rounded"
              sx={{
                '& .Mui-selected': {
                  backgroundColor: '#535CE8 !important',
                  color: 'white',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;
