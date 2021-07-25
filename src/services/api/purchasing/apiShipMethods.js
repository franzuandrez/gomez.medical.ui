const { ApiCore } = require('../utilities/Core');

const url = 'v1/ship_methods';
const plural = 'ship_methods';
const single = 'ship_methods';
const nestedResource = '';

const apiShipMethods = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  nested: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,
});


export default apiShipMethods;