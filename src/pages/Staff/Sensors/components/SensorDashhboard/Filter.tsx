import { useState } from 'react';

// ** libs
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const Filter = () => {
  const [startDate, setStartDate] = useState();
  const [startDateError, setStartDateError] = useState<string>();
  const [endDate, setEndDate] = useState();
  const [endDaterror, setEndDateeError] = useState<string>();
  const [error, setError] = useState<any>();

  // ** handle select isEvent
  const handleSelectTime = () => {
    if (startDate !== undefined && endDate !== undefined) {
      // console.log(dayjs(date).format());
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      if (startTime >= endTime) {
        setError('Start date cannot be greater than end date');
      } else {
        setError(undefined);
        setStartDateError(undefined);
        setEndDateeError(undefined);
        console.log(dayjs(startDate).format());
        console.log(dayjs(endDate).format());
      }
    } else {
      if (startDate == undefined) {
        setStartDateError('Select start date');
      }
      if (endDate == undefined) {
        setEndDateeError('Select end date');
      }
    }
  };

  return (
    <div className="mt-5 flex items-center gap-2">
      {/* start  date */}
      <div className="">
        <p className="text-t3 font-medium text-gray-500">Start date</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            // onError={(newError, value) => setError(newError)}
            // slotProps={{
            //   textField: {
            //     helperText: errorMessage,
            //   },
            // }}
            value={startDate}
            // minDateTime={today}
            onChange={(event: any) => {
              setStartDate(event);
            }}
            // label="Start date"
            // format="DD-MM-YYYY"
            sx={{
              height: '36px',
              '& .MuiFormLabel-root': {
                top: '-11px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                // border: 'none',
              },
              '& .MuiInputBase-inputAdornedEnd': {
                padding: '6px 14px',
                fontSize: '14px',
              },
            }}
            className="block md:w-[260px] w-full h-[36px] p-[12px] text-t3 rounded-[5px] focus:outline-primary outline-none border-none"
          />
        </LocalizationProvider>
        {<p className="text-danger text-t3">{startDateError} &nbsp;&nbsp;</p>}
      </div>

      {/* end date */}
      <div className="">
        <p className="text-t3 font-medium text-gray-500">End date</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            // onError={(newError, value) => setError(newError)}
            // slotProps={{
            //   textField: {
            //     helperText: errorMessage,
            //   },
            // }}
            value={endDate}
            // minDateTime={today}
            onChange={(event: any) => {
              setEndDate(event);
            }}
            sx={{
              height: '36px',
              '& .MuiFormLabel-root': {
                top: '-11px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                // border: 'none',
              },
              '& .MuiInputBase-inputAdornedEnd': {
                padding: '6px 14px',
                fontSize: '14px',
              },
            }}
            className="block md:w-[260px] w-full h-[36px] p-[12px] text-t3 rounded-[5px] focus:outline-primary outline-none border-none"
          />
        </LocalizationProvider>
        {<p className="text-danger text-t3">{endDaterror} &nbsp;&nbsp;</p>}
      </div>

      {/* save button */}
      <button
        onClick={() => handleSelectTime()}
        className="rounded-[6px] text-white text-t3 font-medium px-5 py-1 mb-[5px] bg-primary"
      >
        Save
      </button>

      {/* temperature */}
      <div>
        <select
          className={`block md:w-[140px] w-full h-[34px] pl-[10px] text-t3 sm:text-t3 mb-[5px] font-poppins border rounded-[5px] focus:outline-primary`}
        >
          <option value="TEMPERATURE">Temperature</option>
          <option value="LIGHT">Light</option>
          <option value="HUMIDITY">Humidity</option>
          <option value="SMOKE">Smoke</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
