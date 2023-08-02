import { Route, Routes } from 'react-router-dom';

import styles from 'src/utils/style';

// ** pages
import LoRa from './components/LoRaDashhboard/LoRa';
import LoRaData from './components/LoRaData/LoRaData';

const NodeContainer = () => {
  return (
    <div className={`${styles.flexCenter} font-poppins w-full pl-[208.5px]`}>
      <div className={`${styles.container}`}>
        {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/">
            <Route index element={<LoRa />} />
            <Route path="/:id" element={<LoRaData />} />
          </Route>
        </Routes>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default NodeContainer;
