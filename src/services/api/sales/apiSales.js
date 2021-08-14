const { ApiCore } = require('../utilities/Core');

const url = 'v1/sales';
const plural = 'sales';
const single = 'sale';
const nestedResource = '';

const apiSales = new ApiCore({
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


export default apiSales;