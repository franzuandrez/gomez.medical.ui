const { ApiCore } = require('../utilities/Core');

const url = 'v1/dashboard';
const plural = 'dashboard';
const single = 'dashboard';
const nestedResource = '';


const apiDashboard = new ApiCore({
  getAll: true,
  getSingle: false,
  post: false,
  put: false,
  patch: false,
  delete: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource
});


export default apiDashboard;