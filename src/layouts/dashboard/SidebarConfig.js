// routes
import { PATH_APP } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  map: getIcon('ic_map'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  page: getIcon('ic_page'),
  user: getIcon('ic_user'),
  copy: getIcon('ic_copy'),
  error: getIcon('ic_error'),
  charts: getIcon('ic_charts'),
  editor: getIcon('ic_editor'),
  upload: getIcon('ic_upload'),
  animate: getIcon('ic_animate'),
  calendar: getIcon('ic_calendar'),
  elements: getIcon('ic_elements'),
  carousel: getIcon('ic_carousel'),
  language: getIcon('ic_language'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  components: getIcon('ic_components'),
  authenticator: getIcon('ic_authenticator'),
  warehouse: getIcon('ic_warehouse')
};

const sidebarConfig = [

  // CATALOGS
  // ----------------------------------------------------------------------
  {
    subheader: 'Catalogos',
    items: [
      {
        title: 'Ubicaciones',
        icon: ICONS.warehouse,
        href: PATH_APP.locations.root,
        items: [
          {
            title: 'Bodega',
            href: PATH_APP.locations.warehouses.root
          },
          {
            title: 'Sector',
            href: PATH_APP.locations.sections.root
          },
          {
            title: 'Pasillo',
            href: PATH_APP.locations.corridors.root
          },
          {
            title: 'Rack',
            href: PATH_APP.locations.racks.root
          },
          {
            title: 'Nivel',
            href: PATH_APP.locations.levels.root
          },
          {
            title: 'Posicion',
            href: PATH_APP.locations.positions.root
          },
          {
            title: 'Bin',
            href: PATH_APP.locations.bins.root
          }
        ]
      },
      {
        title: 'Personas',
        icon: ICONS.user,
        href: PATH_APP.people.root,
        items: [
          {
            title: 'Proveedores',
            href: PATH_APP.people.vendors.root
          },
          {
            title: 'Empleados',
            href: PATH_APP.people.employees.root
          },
          {
            title: 'Clientes',
            href: PATH_APP.people.customers.root
          }
        ]
      },
      {
        title: 'Ecommerce',
        icon: ICONS.cart,
        href: PATH_APP.products.root,
        items: [
          {
            title: 'Productos',
            href: PATH_APP.products.products.root
          },
          {
            title: 'Categorias',
            href: PATH_APP.products.categories.root
          },
          {
            title: 'SubCategorias',
            href: PATH_APP.products.subcategories.root
          },
        ]
      }

    ]

  }


];

export default sidebarConfig;
