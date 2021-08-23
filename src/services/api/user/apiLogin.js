const { ApiCore } = require('../utilities/Core');

const url = 'v1/login';
const plural = '';
const single = '';
const nestedResource = '';

const apiLogin   = new ApiCore({
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


export default apiLogin ;