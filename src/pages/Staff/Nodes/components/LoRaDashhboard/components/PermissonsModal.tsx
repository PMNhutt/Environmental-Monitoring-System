import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';

import icon from 'src/assets/images/permission.svg';
import useDebounce from 'src/share/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from 'src/redux/store/hooks';
import { searchUsers } from 'src/redux/slices/usersSlice';
import { assignNode, getAssignedUsers } from 'src/redux/slices/nodeSlice';
import { UsersProps } from 'src/utils/interface';

// ** compoennts
import DropdownItem from './PermissonComp/DropdownItem';
import AssignedUser from './PermissonComp/AssignedUser';

interface PermissonProps {
  openModal: boolean;
  setOpenModal: any;
  nodeId: string;
}

const PermissonsModal: React.FC<PermissonProps> = (props) => {
  const { openModal, setOpenModal, nodeId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [userList, setUserList] = useState<any>([]);
  const loading = useAppSelector((state) => state.users.loading);
  const assining = useAppSelector((state) => state.nodes.assigning);
  const debounced = useDebounce(searchValue, 600);
  const dispatch = useAppDispatch();

  const [assignedUsers, setAssignedUsers] = useState<any>([]);

  // handle save permisson
  const handleConfirmModal = () => {
    const idArray = assignedUsers.map((user: UsersProps) => user.id);
    const req = {
      nodeId: nodeId,
      users: idArray,
    };
    dispatch(assignNode(req)).then(() => {
      setOpenModal(false);
    });
  };

  // ** get assigned user in this node
  useEffect(() => {
    dispatch(getAssignedUsers(nodeId)).then((res) => {
      setAssignedUsers(res.payload);
    });
  }, []);

  // ** get user data list
  useEffect(() => {
    if (debounced !== '') {
      dispatch(searchUsers(debounced?.trim())).then((res) => {
        setUserList(res.payload);
      });
    } else {
      setUserList([]);
    }
  }, [debounced]);

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
  top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-[432px] w-full bg-white rounded-[4px] p-4 font-poppins"
      >
        {/* header */}
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <img src={icon} className="object-contain w-[36px]" />
          <p className="text-[#323743] font-medium text-t7">Who can see this Node</p>
          <p className="text-[#323743] text-t4">Assign or remove customer permission </p>
        </div>
        {/* content */}
        {/* search input */}
        <div className="relative my-5">
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
            className="block w-full p-[8px] pl-[40px] text-t3 rounded-[6px] bg-[#F3F4F6] focus:outline-primary "
            placeholder={'Search for name, email...'}
          />
          {/* dropdown list user */}
          {!loading ? (
            <div className={`${searchValue?.length > 0 ? 'block' : 'hidden'}`}>
              {userList?.length > 0 ? (
                <div className="absolute top-11 bg-white rounded border shadow-sm w-full text-t3 max-h-[250px] overflow-y-scroll">
                  {userList.map((item: UsersProps) => (
                    <div key={item.id}>
                      <DropdownItem
                        data={item}
                        setSearchValue={setSearchValue}
                        setAssignedUsers={setAssignedUsers}
                        assignedUsers={assignedUsers}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="absolute top-11 bg-white p-2 rounded border shadow-sm w-full text-center text-t3">
                  User not found
                </div>
              )}
            </div>
          ) : (
            <div className="absolute top-11 bg-white p-2 rounded border shadow-sm w-full text-center text-t3">
              Loading...
            </div>
          )}
        </div>

        {/* assigned user */}
        {assignedUsers.length > 0 ? (
          <div className="my-5 max-h-[200px] overflow-y-scroll">
            {assignedUsers.map((u: any) => (
              <div key={u.id}>
                <AssignedUser user={u} setAssignedUsers={setAssignedUsers} assignedUsers={assignedUsers} />
              </div>
            ))}
          </div>
        ) : (
          <div className="my-5 text-center text-t3 text-gray-500 italic">Not assigned to any user</div>
        )}

        {/* buttons */}
        <div className="flex justify-end items-center gap-4 mt-10 mx-4">
          <button
            onClick={() => setOpenModal(false)}
            className="border-primary border text-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
          >
            Cancel
          </button>
          <button
            disabled={assining}
            onClick={() => handleConfirmModal()}
            className=" text-white bg-primary text-t3 font-medium px-5 py-1 rounded-[6px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PermissonsModal;
