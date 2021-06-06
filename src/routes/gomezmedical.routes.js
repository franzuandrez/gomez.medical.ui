import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// guards

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
      path: PATH_APP.locations.warehouses.warehouse,
      component: lazy(() => import('../views/gomezmedical/locations/warehouses/EditWarehouseForm'))
    },
    {
      exact: true,
      path: PATH_APP.locations.sections.root,
      component: lazy(() => import('../views/gomezmedical/locations/sections/Sections'))
    },
    {
      exact: true,
      path: PATH_APP.locations.sections.newSection,
      component: lazy(() => import('../views/gomezmedical/locations/sections/NewSection'))
    },
    {
      exact: true,
      path: PATH_APP.locations.sections.section,
      component: lazy(() => import('../views/gomezmedical/locations/sections/EditSectionForm'))
    },
    {
      exact: true,
      path: PATH_APP.locations.corridors.root,
      component: lazy(() => import('../views/gomezmedical/locations/corridors/Corridors'))
    },
    {
      exact: true,
      path: PATH_APP.locations.corridors.newCorridor,
      component: lazy(() => import('../views/gomezmedical/locations/corridors/NewCorridor'))
    },
    {
      exact: true,
      path: PATH_APP.locations.corridors.corridor,
      component: lazy(() => import('../views/gomezmedical/locations/corridors/EditCorridorForm'))
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
