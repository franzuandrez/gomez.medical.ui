const { ApiCore } = require('../utilities/Core');

const url = 'v1/default_address';
const plural = 'default_address';
const single = 'default_address';
const nestedResource = '';


const apiDefaultAddress = new ApiCore({
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


export default apiDefaultAddress;