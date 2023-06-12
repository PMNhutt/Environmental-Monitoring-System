import { useState, useEffect } from 'react';
import styles from 'src/utils/style';
import jwt_decode from 'jwt-decode';
import { useAppDispatch } from 'src/redux/store/hooks';
import { getUsers, getUserDetail } from 'src/redux/slices/usersSlice';
import { Navigate } from 'react-router-dom';

// ** components
import Header from './components/Header/Header';
import DataTable from './components/DataTable';
import DetailModal from './components/DetailModal';
import { UserDetailProps } from 'src/utils/interface';

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
  // **
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt: any = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState();

  // ** get user data list
  useEffect(() => {
    setLoading(true);
    dispatch(getUsers()).then((res) => {
      setUsers(res.payload);
    });
    setLoading(false);
  }, []);

  const handleOpenEdit = async (data: any) => {
    setOpenModal(true);
    const res = await dispatch(getUserDetail(data.id));
    setUserDetail(res.payload);
    setModalTitle('Account detail');
    setIsModalDetail(true);
  };

  const handleOpenDelete = (data: any) => {
    console.log(data);
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
          />
        )}
        <div className={`${styles.flexCenter} ${styles.paddingX} lg:px-40`}>
          <div className={`${styles.container}`}>
            {/* header */}
            <div className="mt-10 mb-5">
              <Header setOpenModal={setOpenModal} setModalTitle={setModalTitle} setIsModalDetail={setIsModalDetail} />
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
