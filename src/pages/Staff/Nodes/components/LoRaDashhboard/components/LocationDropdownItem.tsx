import React from 'react';
import { LocationProps } from 'src/utils/interface';

interface DropdownProps {
  data: LocationProps;
  setSearchValue: any;
  getValues: any;
  setValue: any;
}

const LocationDropdownItem: React.FC<DropdownProps> = (props) => {
  const { data, setSearchValue, getValues, setValue } = props;

  const handleSelect = () => {
    setValue("location", data.name)    
  };

  return (
    <div onClick={() => handleSelect()} className="py-2 hover:bg-gray-100 px-5 text-t3 cursor-pointer">
      <p className="font-medium">{data.name}</p>
      <p className="text-t2 text-[#8792AB]">{data.address}</p>
    </div>
  );
};

export default LocationDropdownItem;
