// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DOCS = '/docs';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  page404: '/404',
  page500: '/500'
};

export const PATH_HOME = {
  cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  purchase: 'https://material-ui.com/store/items/minimal-dashboard/',
  components: '/components',
  dashboard: ROOTS_DASHBOARD
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
    labels: [
      path(ROOTS_DASHBOARD, '/mail/label/:customLabel/:mailId?'),
      path(ROOTS_DASHBOARD, '/mail/:systemLabel/:mailId?')
    ]
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: [
      path(ROOTS_DASHBOARD, '/chat/new'),
      path(ROOTS_DASHBOARD, '/chat/:conversationKey')
    ]
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/card'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(
      ROOTS_DASHBOARD,
      '/e-commerce/product/nike-air-force-1-ndestrukt'
    ),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(
      ROOTS_DASHBOARD,
      '/blog/post/portfolio-review-is-this-portfolio-too-creative'
    ),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  foundations: {
    root: path(ROOTS_DASHBOARD, '/foundations'),
    colors: path(ROOTS_DASHBOARD, '/foundations/colors'),
    typography: path(ROOTS_DASHBOARD, '/foundations/typography'),
    shadows: path(ROOTS_DASHBOARD, '/foundations/shadows'),
    grid: path(ROOTS_DASHBOARD, '/foundations/grid'),
    icons: path(ROOTS_DASHBOARD, '/foundations/icons')
  },
  components: {
    root: path(ROOTS_DASHBOARD, '/components'),
    accordion: path(ROOTS_DASHBOARD, '/components/accordion'),
    alert: path(ROOTS_DASHBOARD, '/components/alert'),
    autocomplete: path(ROOTS_DASHBOARD, '/components/autocomplete'),
    avatar: path(ROOTS_DASHBOARD, '/components/avatars'),
    badge: path(ROOTS_DASHBOARD, '/components/badges'),
    breadcrumbs: path(ROOTS_DASHBOARD, '/components/breadcrumbs'),
    buttons: path(ROOTS_DASHBOARD, '/components/buttons'),
    chip: path(ROOTS_DASHBOARD, '/components/chips'),
    dialog: path(ROOTS_DASHBOARD, '/components/dialogs'),
    textfield: path(ROOTS_DASHBOARD, '/components/text-fields'),
    label: path(ROOTS_DASHBOARD, '/components/labels'),
    lists: path(ROOTS_DASHBOARD, '/components/lists'),
    menu: path(ROOTS_DASHBOARD, '/components/menu'),
    pagination: path(ROOTS_DASHBOARD, '/components/pagination'),
    pickers: path(ROOTS_DASHBOARD, '/components/pickers'),
    popover: path(ROOTS_DASHBOARD, '/components/popover'),
    progress: path(ROOTS_DASHBOARD, '/components/progress'),
    rating: path(ROOTS_DASHBOARD, '/components/rating'),
    selectionControls: path(ROOTS_DASHBOARD, '/components/selection-controls'),
    snackbar: path(ROOTS_DASHBOARD, '/components/snackbars'),
    slider: path(ROOTS_DASHBOARD, '/components/slider'),
    stepper: path(ROOTS_DASHBOARD, '/components/steppers'),
    tabs: path(ROOTS_DASHBOARD, '/components/tabs'),
    table: path(ROOTS_DASHBOARD, '/components/table'),
    timeline: path(ROOTS_DASHBOARD, '/components/timeline'),
    tooltip: path(ROOTS_DASHBOARD, '/components/tooltips'),
    transferList: path(ROOTS_DASHBOARD, '/components/transfer-list'),
    treeView: path(ROOTS_DASHBOARD, '/components/tree-view'),

    // Extra
    extraComponents: path(ROOTS_DASHBOARD, '/extra-components'),
    chart: path(ROOTS_DASHBOARD, '/extra-components/chart'),
    map: path(ROOTS_DASHBOARD, '/extra-components/map'),
    editor: path(ROOTS_DASHBOARD, '/extra-components/editor'),
    copyToClipboard: path(
      ROOTS_DASHBOARD,
      '/extra-components/copy-to-clipboard'
    ),
    upload: path(ROOTS_DASHBOARD, '/extra-components/upload'),
    carousel: path(ROOTS_DASHBOARD, '/extra-components/carousel'),
    multiLanguage: path(ROOTS_DASHBOARD, '/extra-components/multi-language'),
    animate: path(ROOTS_DASHBOARD, '/extra-components/animate')
  }
};

export const PATH_DOCS = {
  root: ROOTS_DOCS,
  introduction: path(ROOTS_DOCS, '/introduction'),
  started: path(ROOTS_DOCS, '/getting-started'),
  package: path(ROOTS_DOCS, '/package'),

  // Theme UI
  color: path(ROOTS_DOCS, '/color'),
  typography: path(ROOTS_DOCS, '/typography'),
  icon: path(ROOTS_DOCS, '/icon'),
  shadows: path(ROOTS_DOCS, '/shadows'),
  components: path(ROOTS_DOCS, '/components'),
  tips: path(ROOTS_DOCS, '/tips'),

  // Development
  routing: path(ROOTS_DOCS, '/routing'),
  environmentVariables: path(ROOTS_DOCS, '/environment-variables'),
  stateManagement: path(ROOTS_DOCS, '/state-management'),
  apiCalls: path(ROOTS_DOCS, '/api-calls'),
  analytics: path(ROOTS_DOCS, '/analytics'),
  authentication: path(ROOTS_DOCS, '/authentication'),
  multiLanguage: path(ROOTS_DOCS, '/multi-language'),
  lazyload: path(ROOTS_DOCS, '/lazyload-image'),
  formHelper: path(ROOTS_DOCS, '/form-helper'),

  // Changelog
  support: path(ROOTS_DOCS, '/support'),
  changelog: path(ROOTS_DOCS, '/changelog')
};
