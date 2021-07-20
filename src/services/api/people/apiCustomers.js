const { ApiCore } = require('../utilities/Core');

const url = 'v1/customers';
const plural = 'customers';
const single = 'customers';
const nestedResource = '';


const apiCustomers = new ApiCore({
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
  nestedResource
});


export default apiCustomers;