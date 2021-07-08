const { ApiCore } = require('../utilities/Core');

const url = 'v1/addresses_type';
const plural = 'addresses_type';
const single = 'addresses_type';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiAddressesType = new ApiCore({
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


export default apiAddressesType;