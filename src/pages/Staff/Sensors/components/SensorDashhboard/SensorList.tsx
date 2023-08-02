import { useState } from 'react';
import { useOutsideClick } from 'src/share/hooks/useOutSideClick';
import { SensorProps } from 'src/utils/interface';

// ** assets
import sensor from 'src/assets/images/sensor.svg';

// ** redux
import { Pagination } from '@mui/material';

interface Props {
  sensorList: SensorProps[];
  totalPage: number;
  pageIndex: number;
  setSearchValue: any;
  searchValue: any;
  onChange: any;
}

interface SensorItemProps {
  sensorData: any;
  setOpenEditModal: any;
}

const SensorItem: React.FC<SensorItemProps> = (props) => {
  const { sensorData } = props;
  const [openOptions, setOpenOptions] = useState(false);
  const ref = useOutsideClick(() => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  const getSensorLabel = (data: any) => {
    switch (data) {
      case 'HUMIDITY':
        return 'Humidity Sensor';
      case 'LIGHT':
        return 'Light Sensor';
      case 'TEMPERATURE':
        return 'Temperature Sensor';
      case 'SMOKE':
        return 'Smoke Sensor';
      default:
        break;
    }
  };

  return (
    <div className="w-full flex justify-between items-center pb-2 mb-2 border-b border-b-[#D9D9D9]">
      <div className="w-full flex lg:flex-row flex-col gap-3">
        {/* sensor name */}
        <div className="flex sm:flex-row flex-col sm:items-center gap-3 lg:w-3/4 w-full">
          <div className="w-[133px] h-[68px] bg-[#F3F4F6] border border-[#BDC1CA] flex justify-center items-center">
            <img src={sensor} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <p className="text-t4 font-semibold text-black">{getSensorLabel(sensorData.type)}</p>
            <p className="text-t3 font-medium text-[#8792AB]">Code: {sensorData.sensorCode}</p>
          </div>
        </div>
        {/* belong */}
        <div className="lg:w-1/4 w-full flex items-center">
          <div className="flex flex-col">
            <p className="text-t4 font-semibold text-black">{sensorData.nodeBelongName}</p>
            <p className="text-t3 font-medium text-[#8792AB]">Code: {sensorData.nodeBelongCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SensorList: React.FC<Props> = (props) => {
  const {
    setSearchValue,
    searchValue,
    sensorList,
    pageIndex,
    totalPage,
    onChange,
  } = props;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      {/* header */}
      <div className="w-full flex justify-between md:flex-row flex-col gap-5">
        <div>
          <p className="text-t6 font-semibold">Sensors list</p>
          <p className="text-[#8792AB] text-t4">List of existing sensor in the application</p>
        </div>

        {/* search */}
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
            className="block w-full sm:w-[237px] p-[8px] pl-[40px] text-t3 rounded-[6px] border border-[#D9D9D9] focus:outline-primary "
            placeholder={'Search'}
          />
        </div>
      </div>
      {/* list */}
      <div className="border border-[#B4BECF] px-5 py-2 rounded my-4">
        {/* label */}
        <div className="flex">
          <div className="md:w-3/4 w-full">
            <p className="">Name</p>
          </div>
          <div className="md:w-1/4 w-full">
            <p className="hidden md:block">Belong to node</p>
          </div>
        </div>
        {/* list sensors */}
        <div className="my-5">
          {sensorList.map((sensor: SensorProps) => (
            <div key={sensor.id}>
              <SensorItem
                sensorData={sensor}
                setOpenEditModal={setOpenModal}
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

export default SensorList;
