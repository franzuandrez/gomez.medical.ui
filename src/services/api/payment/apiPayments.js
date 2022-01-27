const { ApiCore } = require('../utilities/Core');

const url = 'v1/payments';
const plural = 'payments';
const single = 'payment';
const nestedResource = '';

const apiPayments = new ApiCore({
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


export default apiPayments;