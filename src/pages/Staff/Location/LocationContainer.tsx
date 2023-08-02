import { Route, Routes } from 'react-router-dom';

import styles from 'src/utils/style';

// ** pages
import LocationDashboard from './components/LocationDashboard/LocationDashboard';

const SensorContainer = () => {
  return (
    <div className={`${styles.flexCenter} font-poppins w-full pl-[208.5px]`}>
      <div className={`${styles.container}`}>
        {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/">
            <Route index element={<LocationDashboard />} />
            <Route path="/:id" element={<LocationDashboard />} />
          </Route>
        </Routes>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default SensorContainer;
