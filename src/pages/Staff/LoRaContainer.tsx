import { Suspense } from 'react';
import styles from 'src/utils/style';
import { Route, Routes } from 'react-router-dom';
import Loading from 'src/share/loading/Loading';

import SideBar from './SideBar/SideBar';
import NodeContainer from './Nodes/NodeContainer';
import SensorContainer from './Sensors/SensorContainer';

const LoRaContainer = () => {
  return (
    <div className={`${styles.flexCenter} font-poppins w-full`}>
      <div className={`${styles.container}`}>
        <NodeContainer />
      </div>
    </div>
  );
};

export default LoRaContainer;
