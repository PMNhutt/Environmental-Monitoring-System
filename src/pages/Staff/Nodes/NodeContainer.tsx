import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from 'src/utils/style';
import Loading from 'src/share/loading/Loading';

// ** pages
import LoRa from './components/LoRaDashhboard/LoRa';
import LoRaData from './components/LoRaData/LoRaData';

const NodeContainer = () => {
  return (
    <div className={`${styles.flexCenter} font-poppins w-full`}>
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
