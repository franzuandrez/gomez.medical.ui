import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import DocsLayout from '../layouts/docs';
import { PATH_DOCS } from './paths';

// ----------------------------------------------------------------------

const DocsRoutes = {
  path: PATH_DOCS.root,
  layout: DocsLayout,
  routes: [
    // GETTING STARTED
    {
      exact: true,
      path: PATH_DOCS.introduction,
      component: lazy(() => import('../views/docs/introduction'))
    },
    {
      exact: true,
      path: PATH_DOCS.started,
      component: lazy(() => import('../views/docs/quickstart'))
    },
    {
      exact: true,
      path: PATH_DOCS.package,
      component: lazy(() => import('../views/docs/package'))
    },

    // THEME UI
    {
      exact: true,
      path: PATH_DOCS.color,
      component: lazy(() => import('../views/docs/color'))
    },
    {
      exact: true,
      path: PATH_DOCS.typography,
      component: lazy(() => import('../views/docs/typography'))
    },
    {
      exact: true,
      path: PATH_DOCS.icon,
      component: lazy(() => import('../views/docs/icon'))
    },
    {
      exact: true,
      path: PATH_DOCS.shadows,
      component: lazy(() => import('../views/docs/shadows'))
    },
    {
      exact: true,
      path: PATH_DOCS.components,
      component: lazy(() => import('../views/docs/components'))
    },
    {
      exact: true,
      path: PATH_DOCS.tips,
      component: lazy(() => import('../views/docs/tips'))
    },

    // DEVELOPMENT
    {
      exact: true,
      path: PATH_DOCS.routing,
      component: lazy(() => import('../views/docs/routing'))
    },
    {
      exact: true,
      path: PATH_DOCS.environmentVariables,
      component: lazy(() => import('../views/docs/environment-variables'))
    },
    {
      exact: true,
      path: PATH_DOCS.stateManagement,
      component: lazy(() => import('../views/docs/state-management'))
    },
    {
      exact: true,
      path: PATH_DOCS.apiCalls,
      component: lazy(() => import('../views/docs/apicalls'))
    },
    {
      exact: true,
      path: PATH_DOCS.analytics,
      component: lazy(() => import('../views/docs/analytics'))
    },
    {
      exact: true,
      path: PATH_DOCS.authentication,
      component: lazy(() => import('../views/docs/authentication'))
    },
    {
      exact: true,
      path: PATH_DOCS.multiLanguage,
      component: lazy(() => import('../views/docs/multi-language'))
    },
    {
      exact: true,
      path: PATH_DOCS.lazyload,
      component: lazy(() => import('../views/docs/lazyload'))
    },

    // SUPPORT & CHANGELOG
    {
      exact: true,
      path: PATH_DOCS.support,
      component: lazy(() => import('../views/docs/support'))
    },
    {
      exact: true,
      path: PATH_DOCS.changelog,
      component: lazy(() => import('../views/docs/changelog'))
    },
    {
      exact: true,
      path: PATH_DOCS.root,
      component: () => <Redirect to={PATH_DOCS.introduction} />
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DocsRoutes;
