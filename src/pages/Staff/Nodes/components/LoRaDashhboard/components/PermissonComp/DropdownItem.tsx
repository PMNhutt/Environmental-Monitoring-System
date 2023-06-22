import React from 'react';
import { toast } from 'react-toastify';
import { UsersProps } from 'src/utils/interface';

interface DropdownProps {
  data: UsersProps;
  setSearchValue: any;
  setAssignedUsers: any;
  assignedUsers: any;
}

const DropdownItem: React.FC<DropdownProps> = (props) => {
  const { data, setSearchValue, setAssignedUsers, assignedUsers } = props;

  const handleSelect = () => {
    setSearchValue('');
    const dupplicate = assignedUsers.find((u: UsersProps) => u.id == data.id);
    if (dupplicate) {
      toast.error('User selected!');
    } else {
      setAssignedUsers((prev: any) => [...prev, data]);
    }
  };

  return (
    <div onClick={() => handleSelect()} className="py-2 hover:bg-gray-100 px-5 text-t3 cursor-pointer">
      <p className="font-medium">{data.name}</p>
      <p className="text-t2 text-[#8792AB]">{data.email}</p>
    </div>
  );
};

export default DropdownItem;
