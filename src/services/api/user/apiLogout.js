const { ApiCore } = require('../utilities/Core');

const url = 'v1/logout';
const plural = '';
const single = '';
const nestedResource = '';

const apiLogout   = new ApiCore({
  getAll: false,
  getSingle: false,
  post: true,
  put: false,
  patch: false,
  delete: false,
  nested: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,
});


export default apiLogout ;