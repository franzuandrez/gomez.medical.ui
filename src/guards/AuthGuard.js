import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_AUTH, PATH_APP, PATH_PAGE ,PATH_DASHBOARD} from '../routes/paths';

// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

export default function AuthProtect({ children }) {
  const { isLoading, isAuthenticated, user } = useAuth();
  const { permissions } =  user;
  const location = useLocation();

  const authorizedActions = {
    [PATH_DASHBOARD.general.app]: 'SHOW_DASHBOARD',
    [PATH_APP.locations.warehouses.root]: 'LIST_WAREHOUSES',
    [PATH_APP.locations.warehouses.newWarehouse]: 'CREATE_WAREHOUSES',
    [PATH_APP.locations.sections.root]: 'LIST_SECTIONS',
    [PATH_APP.locations.sections.newSection]: 'CREATE_SECTIONS',
    [PATH_APP.locations.corridors.root]: 'LIST_CORRIDORS',
    [PATH_APP.locations.corridors.newCorridor]: 'CREATE_CORRIDORS',
    [PATH_APP.locations.racks.root]: 'LIST_RACKS',
    [PATH_APP.locations.racks.newRack]: 'CREATE_RACKS',
    [PATH_APP.locations.levels.root]: 'LIST_LEVELS',
    [PATH_APP.locations.levels.newLevel]: 'CREATE_LEVELS',
    [PATH_APP.locations.positions.root]: 'LIST_POSITIONS',
    [PATH_APP.locations.positions.newPosition]: 'CREATE_POSITIONS',
    [PATH_APP.locations.bins.root]: 'LIST_BINS',
    [PATH_APP.locations.bins.newBin]: 'CREATE_BINS',
    [PATH_APP.people.employees.root]: 'LIST_EMPLOYEES',
    [PATH_APP.people.employees.newEmployee]: 'CREATE_EMPLOYEES',
    [PATH_APP.people.customers.root]: 'LIST_CUSTOMERS',
    [PATH_APP.people.customers.newCustomer]: 'CREATE_CUSTOMERS',
    [PATH_APP.products.root]: 'LIST_PRODUCTS',
    [PATH_APP.products.newProduct]: 'CREATE_PRODUCTS',
    [PATH_APP.products.categories.root]: 'LIST_CATEGORIES',
    [PATH_APP.products.categories.newCategory]: 'CREATE_CATEGORIES',
    [PATH_APP.products.subcategories.root]: 'LIST_SUBCATEGORIES',
    [PATH_APP.products.subcategories.newSubcategory]: 'CREATE_SUBCATEGORIES',
    [PATH_APP.brands.root]: 'LIST_BRANDS',
    [PATH_APP.brands.newBrand]: 'CREATE_BRANDS',
    [PATH_APP.sales.orders.root]: 'LIST_SALES_ORDERS',
    [PATH_APP.sales.orders.newOrder]: 'CREATE_SALES_ORDERS',
    [PATH_APP.people.vendors.root]: 'LIST_VENDORS',
    [PATH_APP.people.vendors.newVendor]: 'CREATE_VENDORS',
    [PATH_APP.purchasing.orders.root]: 'LIST_PURCHASING_ORDERS',
    [PATH_APP.people.vendors.newVendor]: 'CREATE_PURCHASING_ORDERS',
    [PATH_APP.purchasing.orders.root]: 'LIST_PURCHASING_ORDERS',
    [PATH_APP.purchasing.orders.newOrder]: 'CREATE_PURCHASING_ORDERS',
    [PATH_APP.purchasing.ship_methods.root]: 'LIST_PURCHASING_SHIP_METHODS',
    [PATH_APP.purchasing.ship_methods.newShipMethod]: 'CREATE_PURCHASING_SHIP_METHODS',
    [PATH_APP.cash_register_control.controls.root]: 'LIST_CASH_REGISTER_CONTROL',
    [PATH_APP.cash_register_control.controls.startControl]: 'START_PURCHASING_SHIP_METHODS',
    [PATH_APP.cash_register_control.controls.endControl]: 'END_CASH_REGISTER_CONTROL',
    [PATH_APP.payments.payments.root]: 'LIST_PAYMENTS',
    [PATH_APP.payments.payments.create]: 'CREATE_PAYMENTS',
    [PATH_APP.inventory.root]: 'LIST_STOCK',
    [PATH_APP.inventory.addInventory]: 'ADD_STOCK',
  };

  const arePermissionsLoaded  = permissions!==undefined;
  const hasPermission =  !!permissions?.find(item => item.name === authorizedActions[location.pathname]);


  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect to={PATH_AUTH.login} />;
  }

  if(arePermissionsLoaded && !hasPermission){
    console.log(arePermissionsLoaded, hasPermission,location.pathname)
  }

  return <>{children}</>;
}
