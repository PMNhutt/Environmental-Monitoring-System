import React from 'react';
import avatar from 'src/assets/images/avatar.svg';
import { UsersProps } from 'src/utils/interface';

interface Props {
  user: UsersProps;
  setAssignedUsers: any;
  assignedUsers: any;
}

const AssignedUser: React.FC<Props> = (props) => {
  const { user, setAssignedUsers, assignedUsers } = props;
  const handleRemoveUser = (id: string) => {
    const fiterd = assignedUsers?.filter((u: UsersProps) => u.id !== id);
    setAssignedUsers(fiterd);
  };
  return (
    <div className="w-full flex items-center justify-between px-5 py-3">
      {/* info */}
      <div className="flex items-center gap-3">
        <img alt="" src={user.avatar !== null ? user.avatar : avatar} className="object-cover w-[30px] h-[30px]" />
        <div>
          <p className="font-medium text-t3">{user.name}</p>
          <p className="text-t2 text-[#8792AB]">{user.email}</p>
        </div>
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
