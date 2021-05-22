import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
//
import { PATH_DASHBOARD } from './paths';

// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: PATH_DASHBOARD.root,
  guard: AuthGuard,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.general.app,
      component: lazy(() => import('../views/GeneralApp'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.ecommerce,
      component: lazy(() => import('../views/GeneralEcommerce'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.analytics,
      component: lazy(() => import('../views/GeneralAnalytics'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.root,
      component: () => <Redirect to={PATH_DASHBOARD.general.app} />
    },

    // MANAGEMENT : E-COMMERCE
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.shop,
      component: lazy(() => import('../views/EcommerceShop'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.product,
      component: lazy(() => import('../views/EcommerceProductDetails'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.list,
      component: lazy(() => import('../views/EcommerceProductList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.checkout,
      component: lazy(() => import('../views/EcommerceCheckout'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.invoice,
      component: lazy(() => import('../views/EcommerceInvoice'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.eCommerce.root,
      component: () => <Redirect to={PATH_DASHBOARD.eCommerce.shop} />
    },

    // MANAGEMENT : BLOG
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.blog.root,
      component: lazy(() => import('../views/BlogPosts'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.blog.post,
      component: lazy(() => import('../views/BlogPost'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.blog.newPost,
      component: lazy(() => import('../views/BlogNewPost'))
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.user.profile,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.cards,
      component: lazy(() => import('../views/UserCards'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.list,
      component: lazy(() => import('../views/UserList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.account,
      component: lazy(() => import('../views/UserAccount'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.root,
      component: () => <Redirect to={PATH_DASHBOARD.user.profile} />
    },

    // APP : CHAT
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.chat.conversation,
      component: lazy(() => import('../views/Chat'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.chat.root,
      component: () => <Redirect to={PATH_DASHBOARD.chat.new} />
    },

    // APP : MAIL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.mail.labels,
      component: lazy(() => import('../views/Mail'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.mail.root,
      component: () => <Redirect to={PATH_DASHBOARD.mail.all} />
    },

    // APP : CALENDAR
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.calendar,
      component: lazy(() => import('../views/Calendar'))
    },

    // FOUNDATIONS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.foundations.colors,
      component: lazy(() =>
        import('../views/uikit-foundations/FoundationColors')
      )
    },
    {
      exact: true,
      path: PATH_DASHBOARD.foundations.typography,
      component: lazy(() =>
        import('../views/uikit-foundations/FoundationTypography')
      )
    },
    {
      exact: true,
      path: PATH_DASHBOARD.foundations.shadows,
      component: lazy(() =>
        import('../views/uikit-foundations/FoundationShadows')
      )
    },
    {
      exact: true,
      path: PATH_DASHBOARD.foundations.grid,
      component: lazy(() => import('../views/uikit-foundations/FoundationGrid'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.foundations.icons,
      component: lazy(() => import('../views/uikit-foundations/icon'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.foundations.root,
      component: () => <Redirect to={PATH_DASHBOARD.foundations.colors} />
    },

    // COMPONENTS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.components.accordion,
      component: lazy(() => import('../views/uikit-components/accordion'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.alert,
      component: lazy(() => import('../views/uikit-components/Alert'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.autocomplete,
      component: lazy(() => import('../views/uikit-components/autocomplete'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.avatar,
      component: lazy(() => import('../views/uikit-components/Avatar'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.badge,
      component: lazy(() => import('../views/uikit-components/Badge'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.breadcrumbs,
      component: lazy(() => import('../views/uikit-components/Breadcrumb'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.buttons,
      component: lazy(() => import('../views/uikit-components/buttons'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.chip,
      component: lazy(() => import('../views/uikit-components/chips'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.dialog,
      component: lazy(() => import('../views/uikit-components/dialog'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.textfield,
      component: lazy(() => import('../views/uikit-components/textfield'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.label,
      component: lazy(() => import('../views/uikit-components/Label'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.lists,
      component: lazy(() => import('../views/uikit-components/Lists'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.menu,
      component: lazy(() => import('../views/uikit-components/Menus'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.pagination,
      component: lazy(() => import('../views/uikit-components/Pagination'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.pickers,
      component: lazy(() => import('../views/uikit-components/pickers'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.popover,
      component: lazy(() => import('../views/uikit-components/Popover'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.progress,
      component: lazy(() => import('../views/uikit-components/progress'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.rating,
      component: lazy(() => import('../views/uikit-components/Rating'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.selectionControls,
      component: lazy(() =>
        import('../views/uikit-components/selection-controls')
      )
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.snackbar,
      component: lazy(() => import('../views/uikit-components/Snackbar'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.slider,
      component: lazy(() => import('../views/uikit-components/Slider'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.stepper,
      component: lazy(() => import('../views/uikit-components/stepper'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.tabs,
      component: lazy(() => import('../views/uikit-components/Tabs'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.table,
      component: lazy(() => import('../views/uikit-components/table'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.timeline,
      component: lazy(() => import('../views/uikit-components/Timeline'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.tooltip,
      component: lazy(() => import('../views/uikit-components/Tooltip'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.transferList,
      component: lazy(() => import('../views/uikit-components/transfer-list'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.treeView,
      component: lazy(() => import('../views/uikit-components/TreeView'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.root,
      component: () => <Redirect to={PATH_DASHBOARD.components.accordion} />
    },

    // EXTRA COMPONENTS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.components.chart,
      component: lazy(() => import('../views/uikit-extra-components/Charts'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.map,
      component: lazy(() => import('../views/uikit-extra-components/Map'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.editor,
      component: lazy(() => import('../views/uikit-extra-components/Editor'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.copyToClipboard,
      component: lazy(() =>
        import('../views/uikit-extra-components/CopyToClipboard')
      )
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.upload,
      component: lazy(() => import('../views/uikit-extra-components/Upload'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.carousel,
      component: lazy(() => import('../views/uikit-extra-components/Carousel'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.multiLanguage,
      component: lazy(() =>
        import('../views/uikit-extra-components/MultiLanguage')
      )
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.animate,
      component: lazy(() => import('../views/uikit-extra-components/animate'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.components.extraComponents,
      component: () => <Redirect to={PATH_DASHBOARD.components.chart} />
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DashboardRoutes;
