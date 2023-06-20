import { useState, useEffect } from 'react';
import styles from 'src/utils/style';
import jwt_decode from 'jwt-decode';
import { useAppDispatch } from 'src/redux/store/hooks';
import { getUsers, getUserDetail, activateUser } from 'src/redux/slices/usersSlice';
import { Navigate } from 'react-router-dom';
import useDebounce from 'src/share/hooks/useDebounce';

// ** components
import Header from './components/Header/Header';
import DataTable from './components/DataTable';
import DetailModal from './components/DetailModal';
import ConfirmModal from 'src/share/components/ConfirmModal';
import { UsersProps } from 'src/utils/interface';

const data = [
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'admin',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'Kate',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'Smith',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: false,
  },
  {
    userId: crypto.randomUUID(),
    name: 'Joy',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'staff',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'admin',
    status: false,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'staff',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
  {
    userId: crypto.randomUUID(),
    name: 'John',
    phone: '0968454120',
    email: 'abc@gmail.com',
    role: 'user',
    status: true,
  },
];

const UserManagement = () => {
  // ** const
  const accessToken = sessionStorage.getItem('accessToken');
  let decoded_jwt: any = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [userDetail, setUserDetail] = useState();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmDes, setConfirmDes] = useState('');
  const [rowData, setRowData] = useState('');

  const [searchInput, setSearchInput] = useState(null);
  const debounced = useDebounce(searchInput, 600);
  // filer list
  const [activeBtn, setActiveBtn] = useState(1);

  // ** get user data list
  useEffect(() => {
    setLoading(true);
    dispatch(getUsers(debounced?.trim())).then((res) => {
      let filteredUsers = [...res.payload];
      switch (activeBtn) {
        case 1:
          filteredUsers = res.payload;
          break;
        case 2:
          filteredUsers = res.payload.filter((u: UsersProps) => u.isDeleted == false);
          break;
        case 3:
          filteredUsers = res.payload.filter((u: UsersProps) => u.isDeleted == true);
          break;
        default:
          break;
      }
      setUsers(filteredUsers);
    });
    setLoading(false);
  }, [updateData, debounced, activeBtn]);

  const handleOpenEdit = async (data: any) => {
    setOpenModal(true);
    const res = await dispatch(getUserDetail(data.id));
    setUserDetail(res.payload);
    setModalTitle('Account detail');
    setIsModalDetail(true);
  };

  const handleOpenDelete = (data: any) => {
    setRowData(data);
    setOpenConfirmModal(true);
    setConfirmDes(!data.isDeleted ? 'Do you want to disable this account?' : 'Do you want to enable this account?');
  };

  // ** handle delete account
  const handleConfirm = (data: any) => {
    dispatch(activateUser(data)).then(() => {
      setUpdateData((prev: any) => !prev);
      setOpenConfirmModal(false);
    });
  };

  if (decoded_jwt.role !== 'ADMIN') {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        {openModal && (
          <DetailModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={modalTitle}
            isModalDetail={isModalDetail}
            userDetail={userDetail}
            setUpdateData={setUpdateData}
          />
        )}
        {openConfirmModal && (
          <ConfirmModal
            openModal={openConfirmModal}
            setOpenModal={setOpenConfirmModal}
            description={confirmDes}
            rowData={rowData}
            handleConfirm={handleConfirm}
          />
        )}
        <div className={`${styles.flexCenter} ${styles.paddingX} lg:px-40`}>
          <div className={`${styles.container}`}>
            {/* header */}
            <div className="mt-10 mb-5">
              <Header
                setOpenModal={setOpenModal}
                setModalTitle={setModalTitle}
                setIsModalDetail={setIsModalDetail}
                searchValue={searchInput}
                setSearchValue={setSearchInput}
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
              />
            </div>
            {/* data table */}
            <DataTable
              handleOpenEdit={handleOpenEdit}
              handleOpenDelete={handleOpenDelete}
              rowData={users}
              loading={loading}
            />
          </div>
        </div>
      </>
    );
  }
};

export default UserManagement;
