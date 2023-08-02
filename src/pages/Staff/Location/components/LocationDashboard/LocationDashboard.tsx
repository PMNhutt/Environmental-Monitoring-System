import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import plus from 'src/assets/images/plus_white.svg';
import { getAllLocations } from 'src/redux/slices/loraDataSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import useDebounce from 'src/share/hooks/useDebounce';
import defaultValue from 'src/utils/default';
import CreateModal from './CreateModal';
import LocationList from './LocationList';

const LocationDashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [locationList, setLocationList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<any>(1);
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 });
  const [totalItem, setTotalItem] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [editLocationData, setEditLocationData] = useState();
  const debounced = useDebounce(searchValue, 600);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPagination({ ...pagination, offset: page - 1 });
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    const requestData = {
      offset: pagination.offset,
      limit: pagination.limit,
      search: searchValue,
      sort: activeDropdown
    };
    dispatch(getAllLocations(requestData)).then((res: any) => {
      const locationList = res.payload.data;
      setTotalItem(Math.ceil(res.payload.count / pagination.limit));
      setLocationList(locationList);
    });
  }, [pagination, activeDropdown, updateData, debounced]);

  return (
    <>
      {openModal && (
        <CreateModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setUpdateData={setUpdateData}
          editData={editLocationData}
        />
      )}
      <div className="my-12 mx-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-t7 font-semibold text-black">
              Locations List
            </h1>
            <p className="text-[#8792AB] text-t4">List of all existing locations in the application</p>
          </div>
          <div className="flex">
            {currentUser.role === 'STAFF' && (
              <button
                onClick={() => {
                  setOpenModal(true);
                  setEditLocationData(undefined);
                }}
                className="rounded-[6px] text-t3 bg-primary text-white font-medium py-1 px-3 flex items-center gap-2 pr-8 mr-2"
              >
                <img src={plus} className="object-cover w-[20px] h-[20px]" />
                New
              </button>
            )}
            <div className="relative h-fit">
              <svg
                aria-hidden="true"
                className="w-[15px] h-[15px] text-[#b5b5b5] dark:text-[#b5b5b5] absolute top-[50%] translate-y-[-50%] left-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                value={searchValue ? searchValue : ''}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                id="search"
                className="block w-full sm:w-[237px] h-[36px] p-[8px] pl-[40px] text-t3 rounded-[6px] mr-2 border border-[#D9D9D9] focus:outline-primary "
                placeholder={'Search'}
              />
            </div>
            <Select
              MenuProps={defaultValue.MenuProps}
              value={activeDropdown}
              onChange={(e) => setActiveDropdown(e.target.value)}
              className={`block w-full h-[36px] text-[#D9D9D9] text-t3  border rounded-[5px] focus:outline-primary`}
            >
              <MenuItem value={1}>Last created</MenuItem>
              <MenuItem value={0}>Oldest created</MenuItem>
            </Select>
          </div>
        </div>
        <LocationList
          setOpenEditModal={setOpenModal}
          currentUser={currentUser}
          locationList={locationList}
          setLocationList={setLocationList}
          setUpdateData={setUpdateData}
          editLocationData={editLocationData}
          setEditLocationData={setEditLocationData}
          onChange={handleChangePage}
          pageIndex={pagination.offset}
          totalPage={totalItem}
        />
      </div>
    </>
  );
};

export default LocationDashboard;
