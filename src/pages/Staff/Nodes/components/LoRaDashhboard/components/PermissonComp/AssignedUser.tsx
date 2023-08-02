import React, { useState } from 'react';
import avatar from 'src/assets/images/avatar.svg';
import { UsersPropsWithPermission } from 'src/utils/interface';

interface Props {
  user: UsersPropsWithPermission;
  setAssignedUsers: any;
  assignedUsers: any;
}

const AssignedUser: React.FC<Props> = (props) => {
  const { user, setAssignedUsers, assignedUsers } = props;
  const [selectedOption, setSelectedOption] = useState('VIEW');
  const handleRemoveUser = (id: string) => {
    const filtered = assignedUsers?.filter((u: UsersPropsWithPermission) => u.id !== id);
    setAssignedUsers(filtered);
  };

  const handleChangePermission = (permission: string) => {
    const filtered = assignedUsers?.map((u: UsersPropsWithPermission) => u.id === user.id ? { ...u, permission } : u);
    setAssignedUsers(filtered);
  };
  return (
    <div className="w-full flex items-center justify-between px-5 py-3">
      {/* info */}
      <div className="flex items-center gap-3 w-[170px] overflow-hidden text-ellipsis">
        <img alt="" src={user.avatar !== null ? user.avatar : avatar} className="object-cover w-[30px] h-[30px]" />
        <div>
          <p className="font-medium text-t3 text-ellipsis whitespace-nowrap overflow-hidden">{user.name}</p>
          <p className="text-t2 text-[#8792AB] text-ellipsis whitespace-nowrap overflow-hidden">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center">
        <select
          value={user.permission} // Use the state variable for the value
          onChange={(e) => handleChangePermission(e.target.value)} // Update the selected value on change
          className={`w-full h-[30px]
           px-2 text-t3 sm:text-t3 font-poppins rounded-[5px] focus:outline-primary border border-primary`}
        >
          <option value="VIEW">View</option>
          <option value="ACTION">Action</option>
        </select>
      </div>
      {/* button */}
      <button
        onClick={() => handleRemoveUser(user.id)}
        className="text-danger text-t2 font-medium px-2 py-1 rounded-[6px] border border-danger"
      >
        Remove
      </button>
    </div>
  );
};

export default AssignedUser;
