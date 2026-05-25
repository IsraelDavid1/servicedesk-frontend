import { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('@pages/Dashboard/DashboardPage'));
const CallsListPage = lazy(() => import('@pages/Calls/CallsListPage'));
<Suspense fallback={<Loading />}>