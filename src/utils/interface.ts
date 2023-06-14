/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RouteProps {
  path: string;
  component: React.ElementType;
  title: string;
  layout?: any;
}

export interface FeatureProps {
  position: string;
  lottieSrc: any;
  title: string;
  description: string;
  isEven?: boolean;
}

export interface AuthFormProps {
  isLogin: boolean;
}

export interface DetailModalProps {
  openModal: boolean;
  setOpenModal: any;
  title: string;
  isModalDetail: boolean;
  userDetail: any;
  setUpdateData: any;
}

export interface LoRaTypeProps {
  unit: string;
  level: string;
  value: number;
  setLoRaUnit: any;
}

export interface UsersProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isDeleted: boolean;
  role: string;
  avatar: string;
}

export interface UserDetailProps extends UsersProps {
  dateOfBirth: string;
  address: string;
  sub: string;
}

export interface UserDetailById extends UsersProps {
  dateOfBirth: string;
  address: string;
}

export interface ConfirmModalProps {
  openModal: boolean;
  setOpenModal: any;
  description: string;
  handleConfirm: any;
  rowData: any;
}
