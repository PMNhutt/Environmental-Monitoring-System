import { lazy } from 'react';
import { RouteProps } from 'src/utils/interface';

const LandingPage = lazy(() => import('src/pages/LandingPage/LandingPage'));

// ** public routes (no need authen)
const publicRoutes: [RouteProps] = [{ path: '/', component: LandingPage, title: 'Environmental Monitoring System' }];

// ** private routes (need authen + authorization)
const privateRoutes: [] = [];

export { publicRoutes, privateRoutes };
