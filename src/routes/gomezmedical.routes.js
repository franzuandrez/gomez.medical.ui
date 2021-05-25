import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
//
import { PATH_APP } from './paths';

const GomezMedicalRoutes = {
  path: PATH_APP.root,
  layout: DashboardLayout,
  routes: [
    {
      exact: true,
      path: PATH_APP.locations.warehouses.root,
      component: lazy(() => import('../views/gomezmedical/locations/warehouses/Warehouses'))
    },
    {
      exact: true,
      path: PATH_APP.locations.warehouses.newWarehouse,
      component: lazy(() => import('../views/gomezmedical/locations/warehouses/NewWarehouse'))
    },
    {
      exact: true,
      path: PATH_APP.locations.sections,
      component: lazy(() => import('../views/BlogPosts'))
    },
    {
      exact: true,
      path: PATH_APP.locations.corridors,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_APP.locations.racks,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_APP.locations.levels,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_APP.locations.positions,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_APP.locations.bines,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      component: () => <Redirect to='/404' />
    }
  ]
};

export default GomezMedicalRoutes;
