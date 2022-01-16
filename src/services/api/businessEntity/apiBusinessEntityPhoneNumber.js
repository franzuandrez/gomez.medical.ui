const { ApiCore } = require('../utilities/Core');

const url = 'v1/phone_number';
const plural = 'phone_number';
const single = 'phone_number';
const nestedResource = '';

const apiBusinessEntityPhoneNumber = new ApiCore({
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


export default apiBusinessEntityPhoneNumber;