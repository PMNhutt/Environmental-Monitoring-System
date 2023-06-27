import React from 'react';
import Pagination from '@mui/material/Pagination';

const LogItem = () => {
  return (
    <div className="rounded-[8px] shadow-sm border border-gray-300 py-2 px-4 my-3">
      <div className="pb-2 border-b">
        <p className="">Sensor Light-S-1 Light Insensity has reach 31 with limit of [12 ; 30] Too High</p>
      </div>
      {/* time */}
      <div className="flex w-full justify-end">
        <p className="font-medium text-gray-400 text-t3">27-6-2023: 2:26</p>
      </div>
    </div>
  );
};

const ChangeLog = () => {
  return (
    <div className="p-5 border-[#B4BECF] border bg-white rounded w-full">
      <p className="text-t7 font-semibold mb-3">Change log</p>

      {/* log list */}
      <div>
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
      </div>
      <div className="w-full flex justify-end">
        <Pagination
          count={10}
          shape="rounded"
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#535CE8',
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChangeLog;
