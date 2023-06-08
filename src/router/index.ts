import { lazy } from 'react';
import { RouteProps } from 'src/utils/interface';
import EmptyLayout from 'src/share/layouts/EmptyLayout';

const LandingPage = lazy(() => import('src/pages/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('src/pages/Auth/Login/Login'));

// ** public routes (no need authen)
const publicRoutes: RouteProps[] = [
  { path: '/', component: LandingPage, title: 'Environmental Monitoring System' },
  { path: '/login', component: LoginPage, title: 'Envi - Login', layout: EmptyLayout },
];

// ** private routes (need authen + authorization)
const privateRoutes: [] = [];

export { publicRoutes, privateRoutes };
