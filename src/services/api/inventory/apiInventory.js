const { ApiCore } = require('../utilities/Core');

const url = 'v1/inventory';
const plural = 'inventory';
const single = 'inventory';
const nestedResource = '';

const apiInventory = new ApiCore({
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


export default apiInventory;