# Routing

The routing is based on [react-router-dom](https://reactrouter.com/web/guides/quick-start).

In this page you will find how to add new routes and how we handle existing routes.

---

You can find the template's router configuration in `src/router/index.js`.
and `src/routes/paths.js` contains all routes of our template.

#### How to add a new route?

**1. New path definition at `src/routes/paths.js`**

```js
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DOCS = '/docs';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  newRouting1: path(ROOTS_DASHBOARD, '/newRouting1'),
  newRouting2: path(ROOTS_DASHBOARD, '/newRouting2/child')
};
// Output
// PATH_DASHBOARD: {
//   "root": "/dashboard",
//   "newRouting1": "/dashboard/newRouting1",
//   "newRouting2": "/dashboard/newRouting2/child",
// }

export const PATH_DOCS = {
  root: ROOTS_DOCS,
  newRouting1: path(ROOTS_DOCS, '/newRouting1'),
  newRouting2: path(ROOTS_DOCS, '/newRouting2/child')
};
// Output
// PATH_DOCS: {
//   "root": "/docs",
//   "newRouting1": "/docs/newRouting1",
//   "newRouting2": "/docs/newRouting2/child",
// }
```

**2. At `src/routes/index.js` call new path from `src/routes/paths.js`**

```js
import { PATH_DASHBOARD, PATH_DOCS } from './paths';

const routes = [
  {
    exact: true,
    path: PATH_DASHBOARD.newRouting1,
    component: lazy(() => import('src/views/ComponentApp1'))
  },
  {
    exact: true,
    path: PATH_DOCS.newRouting1,
    component: lazy(() => import('src/views/ComponentDocs1'))
  },
  // Redirect(optional)
  {
    exact: true,
    path: PATH_DASHBOARD.root,
    component: () => <Redirect to={PATH_DASHBOARD.newRouting1} />
  },
  {
    exact: true,
    path: PATH_DOCS.root,
    component: () => <Redirect to={PATH_DOCS.newRouting1} />
  }
];
```

**Usage for Link**

```js
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

<Link
  underline="none"
  variant="subtitle2"
  component={RouterLink}
  to={PATH_DASHBOARD.newRouting1}
>
  Go to ComponentApp1
</Link>;
```
