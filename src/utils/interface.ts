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

export interface FeatureCardProps {
  lottieSrc: any;
  title: string;
  description: string;
  delay: number;
}

export interface IntroProps {
  position: string;
  image: any;
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
  setEditSensorData: any;
  setOpenEditModal: any;
  setUpdateData: any;
  sensorData: any;
  setSelectedSensorId: any;
  selectedSensorId: any;
  setSensorList: any;
  sensorList: any;
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
  name?: string;
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

export interface NodeProps {
  id: string;
  name: string;
  description: string;
  nodeCode: string;
  createdDate: string;
  updatedDate: string;
}

export interface SensorProps {
  id: string;
  sensorId: string;
  minThreshold: number;
  maxThreshold: number;
  type: string;
  power: string;
  size: string;
  productLine: string;
  interval: number;
  location: string;
  createdDate: string;
  updatedDate: string;
  nodeBelongName: string;
  nodeBelongCode: string;
}
