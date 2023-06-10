import { useState } from 'react';
import styles from 'src/utils/style';

// ** components
import Header from './components/Header/Header';
import DataTable from './components/DataTable';
import DetailModal from './components/DetailModal';

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
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenEdit = (data: any) => {
    console.log(data);
    setOpenModal(true);
    setModalTitle('Account detail');
  };

  const handleOpenDelete = (data: any) => {
    console.log(data);
  };
  return (
    <>
      {openModal && <DetailModal openModal={openModal} setOpenModal={setOpenModal} title={modalTitle} />}
      <div className={`${styles.flexCenter} ${styles.paddingX} lg:px-40`}>
        <div className={`${styles.container}`}>
          {/* header */}
          <div className="mt-10 mb-5">
            <Header setOpenModal={setOpenModal} setModalTitle={setModalTitle} />
          </div>
          {/* data table */}
          <DataTable
            handleOpenEdit={handleOpenEdit}
            handleOpenDelete={handleOpenDelete}
            rowData={data}
            loading={false}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
