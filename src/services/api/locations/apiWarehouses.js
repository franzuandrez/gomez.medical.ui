const { ApiCore } = require('../utilities/Core');

const url = 'v1/warehouses';
const plural = 'warehouses';
const single = 'warehouse';
const nestedResource = 'sections';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiWarehouses = new ApiCore({
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
  nestedResource
});


export default apiWarehouses;