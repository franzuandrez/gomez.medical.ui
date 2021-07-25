const { ApiCore } = require('../utilities/Core');

const url = 'v1/phone_number_types';
const plural = 'phone_number_types';
const single = 'phone_number_type';
const nestedResource = '';

const apiBusinessEntityPhoneNumberType = new ApiCore({
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


export default apiBusinessEntityPhoneNumberType;