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
}

export interface LoRaTypeProps {
  unit: string;
  level: string;
  value: number;
  setLoRaUnit: any;
}
