// routes
import { PATH_DASHBOARD, PATH_PAGE, PATH_AUTH } from '../../routes/paths';
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
  authenticator: getIcon('ic_authenticator')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        href: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: 'e-commerce',
        href: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.ecommerce
      },
      {
        title: 'analytics',
        href: PATH_DASHBOARD.general.analytics,
        icon: ICONS.analytics
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        icon: ICONS.user,
        href: PATH_DASHBOARD.user.root,
        items: [
          {
            title: 'profile',
            href: PATH_DASHBOARD.user.profile
          },
          {
            title: 'cards',
            href: PATH_DASHBOARD.user.cards
          },
          {
            title: 'list',
            href: PATH_DASHBOARD.user.list
          },
          {
            title: 'account',
            href: PATH_DASHBOARD.user.account
          }
        ]
      },

      // MANAGEMENT : E-COMMERCE
      // ----------------------------------------------------------------------
      {
        title: 'e-commerce',
        icon: ICONS.cart,
        href: PATH_DASHBOARD.eCommerce.root,
        items: [
          {
            title: 'shop',
            href: PATH_DASHBOARD.eCommerce.shop
          },
          {
            title: 'product',
            href: PATH_DASHBOARD.eCommerce.productById
          },
          {
            title: 'list',
            href: PATH_DASHBOARD.eCommerce.list
          },
          {
            title: 'checkout',
            href: PATH_DASHBOARD.eCommerce.checkout
          },
          {
            title: 'invoice',
            href: PATH_DASHBOARD.eCommerce.invoice
          }
        ]
      },

      // MANAGEMENT : BLOG
      // ----------------------------------------------------------------------
      {
        title: 'blog',
        icon: ICONS.blog,
        href: PATH_DASHBOARD.blog.root,
        items: [
          {
            title: 'posts',
            href: PATH_DASHBOARD.blog.root
          },
          {
            title: 'post',
            href: PATH_DASHBOARD.blog.postById
          },
          {
            title: 'new post',
            href: PATH_DASHBOARD.blog.newPost
          }
        ]
      }
    ]
  },
  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        href: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail
      },
      {
        title: 'chat',
        href: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat
      },
      {
        title: 'calendar',
        href: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar
      }
    ]
  },
  // PAGES
  // ----------------------------------------------------------------------
  {
    subheader: 'pages',
    items: [
      {
        title: 'auth',
        href: PATH_AUTH.loginUnprotected,
        icon: ICONS.authenticator,
        items: [
          {
            title: 'login',
            href: PATH_AUTH.loginUnprotected
          },
          {
            title: 'register',
            href: PATH_AUTH.registerUnprotected
          },
          {
            title: 'reset password',
            href: PATH_AUTH.resetPassword
          },
          {
            title: 'verify code',
            href: PATH_AUTH.verify
          }
        ]
      },
      {
        title: 'errors & status',
        href: '/404',
        icon: ICONS.error,
        items: [
          {
            title: 'page 404',
            href: '/404'
          },
          {
            title: 'page 500',
            href: '/500'
          },
          {
            title: 'maintenance',
            href: PATH_PAGE.maintenance
          },
          {
            title: 'coming soon',
            href: PATH_PAGE.comingSoon
          }
        ]
      },
      {
        title: 'landing page',
        href: '/',
        icon: ICONS.page
      },
      {
        title: 'pricing',
        href: PATH_PAGE.pricing,
        icon: ICONS.page
      },
      {
        title: 'payment',
        href: PATH_PAGE.payment,
        icon: ICONS.page
      }
    ]
  },
  // UI KIT
  // ----------------------------------------------------------------------
  {
    subheader: 'UI kit',
    items: [
      {
        // FOUNDATIONS
        // ----------------------------------------------------------------------
        title: 'foundations',
        href: PATH_DASHBOARD.foundations.root,
        icon: ICONS.elements,
        items: [
          {
            title: 'colors',
            href: PATH_DASHBOARD.foundations.colors
          },
          {
            title: 'typography',
            href: PATH_DASHBOARD.foundations.typography
          },
          {
            title: 'shadows',
            href: PATH_DASHBOARD.foundations.shadows
          },
          {
            title: 'grid',
            href: PATH_DASHBOARD.foundations.grid
          },
          {
            title: 'icons',
            href: PATH_DASHBOARD.foundations.icons
          }
        ]
      },
      {
        // COMPONENTS
        // ----------------------------------------------------------------------
        title: 'components',
        href: PATH_DASHBOARD.components.root,
        icon: ICONS.components,
        items: [
          {
            title: 'accordion',
            href: PATH_DASHBOARD.components.accordion
          },
          {
            title: 'alert',
            href: PATH_DASHBOARD.components.alert
          },
          {
            title: 'autocomplete',
            href: PATH_DASHBOARD.components.autocomplete
          },
          {
            title: 'avatar',
            href: PATH_DASHBOARD.components.avatar
          },
          {
            title: 'badge',
            href: PATH_DASHBOARD.components.badge
          },
          {
            title: 'breadcrumbs',
            href: PATH_DASHBOARD.components.breadcrumbs
          },
          {
            title: 'buttons',
            href: PATH_DASHBOARD.components.buttons
          },
          {
            title: 'chip',
            href: PATH_DASHBOARD.components.chip
          },
          {
            title: 'dialog',
            href: PATH_DASHBOARD.components.dialog
          },
          {
            title: 'label',
            href: PATH_DASHBOARD.components.label
          },
          {
            title: 'lists',
            href: PATH_DASHBOARD.components.lists
          },
          {
            title: 'menu',
            href: PATH_DASHBOARD.components.menu
          },
          {
            title: 'pagination',
            href: PATH_DASHBOARD.components.pagination
          },
          {
            title: 'pickers',
            href: PATH_DASHBOARD.components.pickers
          },
          {
            title: 'popover',
            href: PATH_DASHBOARD.components.popover
          },
          {
            title: 'progress',
            href: PATH_DASHBOARD.components.progress
          },
          {
            title: 'rating',
            href: PATH_DASHBOARD.components.rating
          },
          {
            title: 'selection controls',
            href: PATH_DASHBOARD.components.selectionControls
          },
          {
            title: 'slider',
            href: PATH_DASHBOARD.components.slider
          },
          {
            title: 'snackbar',
            href: PATH_DASHBOARD.components.snackbar
          },
          {
            title: 'stepper',
            href: PATH_DASHBOARD.components.stepper
          },
          {
            title: 'tabs',
            href: PATH_DASHBOARD.components.tabs
          },
          {
            title: 'table',
            href: PATH_DASHBOARD.components.table
          },
          {
            title: 'text field',
            href: PATH_DASHBOARD.components.textfield
          },
          {
            title: 'timeline',
            href: PATH_DASHBOARD.components.timeline
          },
          {
            title: 'tooltip',
            href: PATH_DASHBOARD.components.tooltip
          },
          {
            title: 'transfer list',
            href: PATH_DASHBOARD.components.transferList
          },
          {
            title: 'tree view',
            href: PATH_DASHBOARD.components.treeView
          }
        ]
      },

      // EXTRA COMPONENTS
      // ----------------------------------------------------------------------
      {
        title: 'charts',
        href: PATH_DASHBOARD.components.chart,
        icon: ICONS.charts
      },
      {
        title: 'map',
        href: PATH_DASHBOARD.components.map,
        icon: ICONS.map
      },
      {
        title: 'editor',
        href: PATH_DASHBOARD.components.editor,
        icon: ICONS.editor
      },
      {
        title: 'copy To clipboard',
        href: PATH_DASHBOARD.components.copyToClipboard,
        icon: ICONS.copy
      },
      {
        title: 'upload',
        href: PATH_DASHBOARD.components.upload,
        icon: ICONS.upload
      },
      {
        title: 'carousel',
        href: PATH_DASHBOARD.components.carousel,
        icon: ICONS.carousel
      },
      {
        title: 'multi language',
        href: PATH_DASHBOARD.components.multiLanguage,
        icon: ICONS.language
      },
      {
        title: 'animate',
        href: PATH_DASHBOARD.components.animate,
        icon: ICONS.animate
      }
    ]
  }
];

export default sidebarConfig;
