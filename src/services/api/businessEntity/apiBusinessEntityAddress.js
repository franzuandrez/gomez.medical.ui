const { ApiCore } = require('../utilities/Core');

const url = 'v1/business_entity_addresses';
const plural = 'business_entity_addresses';
const single = 'business_entity_address';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiBusinessEntityAddress = new ApiCore({
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


export default apiBusinessEntityAddress;