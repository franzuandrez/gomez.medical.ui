import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// guards

import DashboardLayout from '../layouts/dashboard';
//
import { PATH_APP } from './paths';
import AuthGuard from '../guards/AuthGuard';

const GomezMedicalRoutes = {
  path: PATH_APP.root,
  guard: AuthGuard,
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
      exact: true,
      path: PATH_APP.people.vendors.root,
      component: lazy(() => import('../views/gomezmedical/people/vendors/Vendors'))
    },
    {
      exact: true,
      path: PATH_APP.people.vendors.newVendor,
      component: lazy(() => import('../views/gomezmedical/people/vendors/NewVendor'))
    },
    {
      exact: true,
      path: PATH_APP.people.vendors.vendor,
      component: lazy(() => import('../views/gomezmedical/people/vendors/EditVendorForm'))
    },

    {
      exact: true,
      path: PATH_APP.people.customers.root,
      component: lazy(() => import('../views/gomezmedical/people/customers/Customers'))
    },
    {
      exact: true,
      path: PATH_APP.people.customers.newCustomer,
      component: lazy(() => import('../views/gomezmedical/people/customers/CustomerCreate'))
    },
    {
      exact: true,
      path: PATH_APP.people.customers.customer,
      component: lazy(() => import('../views/gomezmedical/people/customers/CustomerEdit'))
    },
    {
      exact: true,
      path: PATH_APP.people.employees.root,
      component: lazy(() => import('../views/gomezmedical/people/employees/Employees'))
    },
    {
      exact: true,
      path: PATH_APP.people.employees.newEmployee,
      component: lazy(() => import('../views/gomezmedical/people/employees/EmployeeCreate'))
    },
    {
      exact: true,
      path: PATH_APP.people.employees.employee,
      component: lazy(() => import('../views/gomezmedical/people/employees/EmployeeEdit'))
    },
    {
      exact: true,
      path: PATH_APP.products.categories.root,
      component: lazy(() => import('../views/gomezmedical/ecommerce/categories/Categories'))
    },
    {
      exact: true,
      path: PATH_APP.products.categories.newCategory,
      component: lazy(() => import('../views/gomezmedical/ecommerce/categories/NewCategory'))
    },
    {
      exact: true,
      path: PATH_APP.products.categories.category,
      component: lazy(() => import('../views/gomezmedical/ecommerce/categories/EditCategoryForm'))
    },
    {
      exact: true,
      path: PATH_APP.products.subcategories.root,
      component: lazy(() => import('../views/gomezmedical/ecommerce/subcategories/SubCategories'))
    },
    {
      exact: true,
      path: PATH_APP.products.subcategories.newSubcategory,
      component: lazy(() => import('../views/gomezmedical/ecommerce/subcategories/NewSubCategory'))
    },
    {
      exact: true,
      path: PATH_APP.products.subcategories.subcategory,
      component: lazy(() => import('../views/gomezmedical/ecommerce/subcategories/EditSubCategoryForm'))
    },
    {
      exact: true,
      path: PATH_APP.products.products.root,
      component: lazy(() => import('../views/gomezmedical/ecommerce/products/Products'))
    },
    {
      exact: true,
      path: PATH_APP.products.products.newProduct,
      component: lazy(() => import('../views/gomezmedical/ecommerce/products/NewProduct'))
    },
    {
      exact: true,
      path: PATH_APP.products.products.product,
      component: lazy(() => import('../views/gomezmedical/ecommerce/products/EditProductForm'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.ship_methods.root,
      component: lazy(() => import('../views/gomezmedical/purchasing/ship_method/ShipMethods'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.ship_methods.newShipMethod,
      component: lazy(() => import('../views/gomezmedical/purchasing/ship_method/ShipMethodCreate'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.ship_methods.shipMethod,
      component: lazy(() => import('../views/gomezmedical/purchasing/ship_method/ShipMethodEdit'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.orders.root,
      component: lazy(() => import('../views/gomezmedical/purchasing/orders/PurchaseOrders'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.orders.newOrder,
      component: lazy(() => import('../views/gomezmedical/purchasing/orders/PurchaseOrderCreate'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.orders.checkout,
      component: lazy(() => import('../views/gomezmedical/purchasing/orders/PurchaseCheckout'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.orders.order,
      component: lazy(() => import('../views/gomezmedical/purchasing/orders/PurchaseOrderShow'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.orders.receive,
      component: lazy(() => import('../views/gomezmedical/purchasing/orders/PurchaseReceiveOrder'))
    },
    {
      exact: true,
      path: PATH_APP.purchasing.orders.locate,
      component: lazy(() => import('../views/gomezmedical/purchasing/orders/PurchaseLocateProduct'))
    },
    {
      exact: true,
      path: PATH_APP.inventory.root,
      component: lazy(() => import('../views/gomezmedical/inventory/stocks/Stocks'))
    },
    {
      exact: true,
      path: PATH_APP.inventory.detail,
      component: lazy(() => import('../views/gomezmedical/inventory/stocks/StockDetail'))
    },
    {
      exact: true,
      path: PATH_APP.inventory.addInventory,
      component: lazy(() => import('../views/gomezmedical/inventory/InventoryAdd'))
    },
    {
      exact: true,
      path: PATH_APP.inventory.physicalInventory,
      component: lazy(() => import('../views/gomezmedical/inventory/physical_inventory/PhysicalInventory'))
    },
    {
      exact: true,
      path: PATH_APP.inventory.physicalInventoryNew,
      component: lazy(() => import('../views/gomezmedical/inventory/physical_inventory/PhysicalInventoryNew'))
    },
    {
      exact: true,
      path: PATH_APP.inventory.physicalInventoryShow,
      component: lazy(() => import('../views/gomezmedical/inventory/physical_inventory/PhysicalInventoryShow'))
    },
    {
      exact: true,
      path: PATH_APP.sales.orders.root,
      component: lazy(() => import('../views/gomezmedical/sales/orders/SalesOrders'))
    },
    {
      exact: true,
      path: PATH_APP.sales.orders.newOrder,
      component: lazy(() => import('../views/gomezmedical/sales/orders/SalesOrderCreate'))
    },
    {
      exact: true,
      path: PATH_APP.sales.orders.order,
      component: lazy(() => import('../views/gomezmedical/sales/orders/SalesOrderShow.js'))
    },
    {
      exact: true,
      path: PATH_APP.sales.orders.paid,
      component: lazy(() => import('../views/gomezmedical/sales/orders/SalesOrderUnpaid'))
    },
    {
      exact: true,
      path: PATH_APP.cash_register_control.controls.root,
      component: lazy(() => import('../views/gomezmedical/cash_register/ControlCashRegister'))
    },
    {
      exact: true,
      path: PATH_APP.cash_register_control.controls.startControl,
      component: lazy(() => import('../views/gomezmedical/cash_register/ControlCashRegisterStart'))
    },
    {
      exact: true,
      path: PATH_APP.cash_register_control.controls.showControl,
      component: lazy(() => import('../views/gomezmedical/cash_register/ControlCashRegisterShow'))
    },
    {
      exact: true,
      path: PATH_APP.cash_register_control.controls.endControl,
      component: lazy(() => import('../views/gomezmedical/cash_register/ControlCashRegisterEnd'))
    },
    {
      exact: true,
      path: PATH_APP.payments.root,
      component: lazy(() => import('../views/gomezmedical/payments/Payment'))
    },
    {
      exact: true,
      path: PATH_APP.payments.payments.create,
      component: lazy(() => import('../views/gomezmedical/payments/PaymentCreate'))
    },
    {
      exact: true,
      path: PATH_APP.brands.root,
      component: lazy(() => import('../views/gomezmedical/brands/Brands'))
    },
    {
      exact: true,
      path: PATH_APP.brands.newBrand,
      component: lazy(() => import('../views/gomezmedical/brands/BrandCreate'))
    },
    {
      component: () => <Redirect to='/404' />
    }
  ]
};

export default GomezMedicalRoutes;
