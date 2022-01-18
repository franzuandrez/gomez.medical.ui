const { ApiCore } = require('../utilities/Core');

const url = 'v1/payment_types';
const plural = 'payment_types';
const single = 'payment_type';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiPaymentType = new ApiCore({
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


export default apiPaymentType;