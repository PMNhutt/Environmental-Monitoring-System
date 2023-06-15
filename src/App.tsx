import { Suspense } from 'react';
import DefaultLayout from './share/layouts/DefaultLayout';

import { publicRoutes, privateRoutes } from './router';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Loading from './share/loading/Loading';
import ScrollToTop from './utils/scrollToTop';
import { RouteProps } from './utils/interface';

const PrivateRoute = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken ? <Outlet /> : <Navigate replace to="/login" />;
};

function App() {
  const accessToken = sessionStorage.getItem('accessToken');

  return (
    <Router>
      <ScrollToTop>
        <Suspense fallback={<Loading />}>
          <div>
            <Routes>
              {publicRoutes.map((route: RouteProps, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = DefaultLayout;
                }

                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page title={route.title} />
                      </Layout>
                    }
                  />
                );
              })}

              {privateRoutes.map((route: RouteProps, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  // Layout = Fragment;
                  Layout = DefaultLayout;
                }

                const Page = route.component;
                return (
                  <Route element={<PrivateRoute />}>
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page title={route.title} />
                        </Layout>
                      }
                    />
                  </Route>
                );

                // return accessToken ? (
                //   <Route
                //     key={index}
                //     path={route.path}
                //     element={
                //       <Layout>
                //         <Page title={route.title} />
                //       </Layout>
                //     }
                //   />
                // ) : (
                //   <Route key={crypto.randomUUID()} path={route.path} element={<Navigate to="/login" replace />} />
                // );
              })}
            </Routes>
          </div>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
}

export default App;
