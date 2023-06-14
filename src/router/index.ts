import { lazy } from 'react';
import { RouteProps } from 'src/utils/interface';
import EmptyLayout from 'src/share/layouts/EmptyLayout';
import SystemLayout from 'src/share/layouts/SystemLayout';

const LandingPage = lazy(() => import('src/pages/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('src/pages/Auth/Login/Login'));
const RegisterPage = lazy(() => import('src/pages/Auth/Register/Register'));
const PageNotFound = lazy(() => import('src/pages/PageNotFound/PageNotFound'));
const UserManagementPage = lazy(() => import('src/pages/Admin/UserManagement'));
const Staff = lazy(() => import('src/pages/Staff/Container'));
const PersonalInfo = lazy(() => import('src/pages/PersonalInfo/PersonalInfo'));

// ** public routes (no need authen)
const publicRoutes: RouteProps[] = [
  { path: '/', component: LandingPage, title: 'Environmental Monitoring System' },
  { path: '/login', component: LoginPage, title: 'Envi - Login', layout: EmptyLayout },
  { path: '/register', component: RegisterPage, title: 'Envi - Register', layout: EmptyLayout },
  { path: '*', component: PageNotFound, title: 'Page Not Found', layout: EmptyLayout },
];

// ** private routes (need authen + authorization)
const privateRoutes: RouteProps[] = [
  { path: '/admin', component: UserManagementPage, title: 'Envi - Admin', layout: SystemLayout },
  { path: '/nodes/*', component: Staff, title: 'Envi - LoRa', layout: SystemLayout },
  { path: '/personal/:id', component: PersonalInfo, title: 'Envi - Personal Information', layout: SystemLayout },
];

export { publicRoutes, privateRoutes };
