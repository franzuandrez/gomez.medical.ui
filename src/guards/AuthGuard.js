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
  const { permissions } =  user ?? [];
  const location = useLocation();
  const  matches =   /\/([0-9]+)/.exec(location.pathname)
  const id  = matches && matches[0].replace('/','');


  const authorizedActions = {
    [PATH_DASHBOARD.general.app]: 'SHOW_DASHBOARD',
    [PATH_APP.locations.warehouses.root]: 'LIST_WAREHOUSES',
    [PATH_APP.locations.warehouses.newWarehouse]: 'CREATE_WAREHOUSES',
    [`${PATH_APP.locations.warehouses.root}/${id??'0'}`]: 'EDIT_WAREHOUSES',
    [PATH_APP.locations.sections.root]: 'LIST_SECTIONS',
    [PATH_APP.locations.sections.newSection]: 'CREATE_SECTIONS',
    [`${PATH_APP.locations.sections.root}/${id??'0'}`]: 'EDIT_SECTIONS',
    [PATH_APP.locations.corridors.root]: 'LIST_CORRIDORS',
    [PATH_APP.locations.corridors.newCorridor]: 'CREATE_CORRIDORS',
    [`${PATH_APP.locations.corridors.root}/${id??'0'}`]: 'EDIT_CORRIDORS',
    [PATH_APP.locations.racks.root]: 'LIST_RACKS',
    [PATH_APP.locations.racks.newRack]: 'CREATE_RACKS',
    [`${PATH_APP.locations.racks.root}/${id??'0'}`]: 'EDIT_RACKS',
    [PATH_APP.locations.levels.root]: 'LIST_LEVELS',
    [PATH_APP.locations.levels.newLevel]: 'CREATE_LEVELS',
    [`${PATH_APP.locations.levels.root}/${id??'0'}`]: 'EDIT_LEVELS',
    [PATH_APP.locations.positions.root]: 'LIST_POSITIONS',
    [PATH_APP.locations.positions.newPosition]: 'CREATE_POSITIONS',
    [`${PATH_APP.locations.positions.root}/${id??'0'}`]: 'EDIT_POSITIONS',
    [PATH_APP.locations.bins.root]: 'LIST_BINS',
    [PATH_APP.locations.bins.newBin]: 'CREATE_BINS',
    [`${PATH_APP.locations.bins.root}/${id??'0'}`]: 'EDIT_BINS',
    [PATH_APP.people.employees.root]: 'LIST_EMPLOYEES',
    [PATH_APP.people.employees.newEmployee]: 'CREATE_EMPLOYEES',
    [`${PATH_APP.people.employees.root}/${id??'0'}`]: 'EDIT_EMPLOYEES',
    [PATH_APP.people.customers.root]: 'LIST_CUSTOMERS',
    [PATH_APP.people.customers.newCustomer]: 'CREATE_CUSTOMERS',
    [`${PATH_APP.people.customers.root}/${id??'0'}`]: 'EDIT_CUSTOMERS',
    [PATH_APP.products.root]: 'LIST_PRODUCTS',
    [PATH_APP.products.products.newProduct]: 'CREATE_PRODUCTS',
    [`${PATH_APP.products.root}/${id??'0'}`]: 'EDIT_PRODUCTS',
    [`${PATH_APP.products.root}/show/${id??'0'}`]: 'SHOW_PRODUCTS',
    [PATH_APP.products.categories.root]: 'LIST_CATEGORIES',
    [PATH_APP.products.categories.newCategory]: 'CREATE_CATEGORIES',
    [`${PATH_APP.products.categories.root}/${id??'0'}`]: 'EDIT_CATEGORIES',
    [PATH_APP.products.subcategories.root]: 'LIST_SUBCATEGORIES',
    [PATH_APP.products.subcategories.newSubcategory]: 'CREATE_SUBCATEGORIES',
    [`${PATH_APP.products.subcategories.root}/${id??'0'}`]: 'EDIT_SUBCATEGORIES',
    [PATH_APP.brands.root]: 'LIST_BRANDS',
    [PATH_APP.brands.newBrand]: 'CREATE_BRANDS',
    [`${PATH_APP.brands.root}/${id??'0'}`]: 'EDIT_BRANDS',
    [PATH_APP.sales.orders.root]: 'LIST_SALES_ORDERS',
    [PATH_APP.sales.orders.newOrder]: 'CREATE_SALES_ORDERS',
    [`${PATH_APP.sales.orders.root}/${id??'0'}`]: 'EDIT_SALES_ORDERS',
    [PATH_APP.people.vendors.root]: 'LIST_VENDORS',
    [PATH_APP.people.vendors.newVendor]: 'CREATE_VENDORS',
    [`${PATH_APP.people.vendors.root}/${id??'0'}`]: 'EDIT_VENDORS',
    [PATH_APP.purchasing.orders.root]: 'LIST_PURCHASING_ORDERS',
    [PATH_APP.purchasing.orders.newOrder]: 'CREATE_PURCHASING_ORDERS',
    [`${PATH_APP.purchasing.orders.root}/${id??'0'}`]: 'SHOW_PURCHASING_ORDERS',
    [`${PATH_APP.purchasing.orders.root}/make_payment/${id??'0'}`]: 'MAKE_PAYMENT_PURCHASING_ORDERS',
    [`${PATH_APP.purchasing.orders.root}/see_payments/${id??'0'}`]: 'SEE_PAYMENT_PURCHASING_ORDERS',
    [`${PATH_APP.purchasing.orders.root}/locate/${id??'0'}`]: 'LOCATE_PURCHASING_ORDERS',
    [`${PATH_APP.purchasing.orders.root}/receive/${id??'0'}`]: 'RECEIVE_PURCHASING_ORDERS',
    [PATH_APP.purchasing.ship_methods.root]: 'LIST_PURCHASING_SHIP_METHODS',
    [PATH_APP.purchasing.ship_methods.newShipMethod]: 'CREATE_PURCHASING_SHIP_METHODS',
    [`${PATH_APP.purchasing.ship_methods.root}/${id??'0'}`]: 'EDIT_PURCHASING_SHIP_METHODS',
    [PATH_APP.cash_register_control.controls.root]: 'LIST_CASH_REGISTER_CONTROL',
    [PATH_APP.cash_register_control.controls.startControl]: 'START_PURCHASING_SHIP_METHODS',
    [PATH_APP.cash_register_control.controls.endControl]: 'END_CASH_REGISTER_CONTROL',
    [PATH_APP.payments.payments.root]: 'LIST_PAYMENTS',
    [PATH_APP.payments.payments.create]: 'CREATE_PAYMENTS',
    [PATH_APP.inventory.root]: 'LIST_STOCK',
    [PATH_APP.inventory.addInventory]: 'ADD_STOCK',
    [PATH_APP.inventory.physicalInventory]: 'LIST_PHYSICAL_INVENTORY',
    [PATH_APP.inventory.physicalInventoryNew]: 'CREATE_PHYSICAL_INVENTORY',

  };

  const arePermissionsLoaded  = permissions!==undefined;
  const hasPermission =  !!permissions?.find(item => item.name === authorizedActions[location.pathname]);

  console.log(authorizedActions,id,location.pathname)

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect to={PATH_AUTH.login} />;
  }

  if(arePermissionsLoaded && !hasPermission){
    return <Redirect to={PATH_PAGE.maintenance} />;
  }

  return <>{children}</>;
}
