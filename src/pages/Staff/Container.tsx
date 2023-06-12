import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from 'src/utils/style';
import Loading from 'src/share/loading/Loading';

// ** pages
import LoRa from './components/LoRaDashboard/LoRa';
import LoRaData from './components/LoRaData/LoRaData';

const Container = () => {
  return (
    <div className={`${styles.flexCenter} ${styles.paddingX} lg:px-40 font-poppins w-full`}>
      <div className={`${styles.container} `}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/">
              <Route index element={<LoRa />} />
              <Route path="/:id">
                <Route index element={<LoRaData />} />
              </Route>
              {/* <Route path="blog">
                <Route index element={<BlogManagement />} />
                <Route path="new" element={<CreateBlog />} />
                <Route path="edit/:blogId" element={<CreateBlog />} />
                <Route path="give-voucher/:eventId" element={<GiveEventVoucher />} />
                <Route path="detail/:blogId" element={<BlogDetail />} />
              </Route> */}
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default Container;
