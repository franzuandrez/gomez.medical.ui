const { ApiCore } = require('../utilities/Core');

const url = 'v1/inventory_management';
const plural = 'inventory_management';
const single = 'inventory_management';
const nestedResource = '';

const apiInventoryManagement = new ApiCore({
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


export default apiInventoryManagement;