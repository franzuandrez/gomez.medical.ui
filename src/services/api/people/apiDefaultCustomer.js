const { ApiCore } = require('../utilities/Core');

const url = 'v1/default_customer';
const plural = 'default_customer';
const single = 'default_customer';
const nestedResource = '';


const apiDefaultCustomer = new ApiCore({
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
  nestedResource
});


export default apiDefaultCustomer;