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
      path: PATH_APP.locations.racks.root,
      component: lazy(() => import('../views/gomezmedical/locations/racks/Racks'))
    },
    {
      exact: true,
      path: PATH_APP.locations.racks.newRack,
      component: lazy(() => import('../views/gomezmedical/locations/racks/NewRack'))
    },

    {
      exact: true,
      path: PATH_APP.locations.racks.rack,
      component: lazy(() => import('../views/gomezmedical/locations/racks/EditRackForm'))
    },
    {
      exact: true,
      path: PATH_APP.locations.levels.root,
      component: lazy(() => import('../views/gomezmedical/locations/levels/Levels'))
    },
    {
      exact: true,
      path: PATH_APP.locations.levels.newLevel,
      component: lazy(() => import('../views/gomezmedical/locations/levels/NewLevel'))
    },
    {
      exact: true,
      path: PATH_APP.locations.levels.level,
      component: lazy(() => import('../views/gomezmedical/locations/levels/EditLevelForm'))
    },
    {
      exact: true,
      path: PATH_APP.locations.positions.root,
      component: lazy(() => import('../views/gomezmedical/locations/positions/Positions'))
    },
    {
      exact: true,
      path: PATH_APP.locations.positions.newPosition,
      component: lazy(() => import('../views/gomezmedical/locations/positions/NewPosition'))
    },
    {
      exact: true,
      path: PATH_APP.locations.positions.position,
      component: lazy(() => import('../views/gomezmedical/locations/positions/EditPositionForm'))
    },
    {
      exact: true,
      path: PATH_APP.locations.bins.root,
      component: lazy(() => import('../views/gomezmedical/locations/bins/Bins'))
    },
    {
      exact: true,
      path: PATH_APP.locations.bins.newBin,
      component: lazy(() => import('../views/gomezmedical/locations/bins/NewBin'))
    },
    {
      exact: true,
      path: PATH_APP.locations.bins.bin,
      component: lazy(() => import('../views/gomezmedical/locations/bins/EditBinForm'))
    },
    {
      component: () => <Redirect to='/404' />
    }
  ]
};

export default GomezMedicalRoutes;
