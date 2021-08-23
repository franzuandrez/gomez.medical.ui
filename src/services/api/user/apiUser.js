const { ApiCore } = require('../utilities/Core');

const url = 'v1/user';
const plural = '';
const single = '';
const nestedResource = '';

const apiUser   = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  nested: true,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,
});


export default apiUser ;