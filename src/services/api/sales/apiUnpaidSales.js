const { ApiCore } = require('../utilities/Core');

const url = 'v1/unpaid_sales';
const plural = 'unpaid_sales';
const single = 'unpaid_sales';
const nestedResource = '';

const apiUnpaidSales  = new ApiCore({
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


export default apiUnpaidSales;