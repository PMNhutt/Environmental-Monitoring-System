import { Route, Routes } from 'react-router-dom';

import styles from 'src/utils/style';

// ** pages
import SensorDashboard from './components/SensorDashhboard/SensorDashboard';

const SensorContainer = () => {
  return (
    <div className={`${styles.flexCenter} font-poppins w-full`}>
      <div className={`${styles.container}`}>
        {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/">
            <Route index element={<SensorDashboard />} />
            <Route path="/:id" element={<SensorDashboard />} />
          </Route>
        </Routes>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default SensorContainer;
