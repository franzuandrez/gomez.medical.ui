const { ApiCore } = require('../utilities/Core');

const url = 'sanctum/csrf-cookie';
const plural = '';
const single = '';
const nestedResource = '';

const apiCSRF   = new ApiCore({
  getAll: true,
  getSingle: false,
  post: false,
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


export default apiCSRF ;