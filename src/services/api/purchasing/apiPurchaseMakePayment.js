const { ApiCore } = require('../utilities/Core');

const url = 'v1/purchase/make_payment';
const plural = 'purchase/make_payment';
const single = 'purchase/make_payment';
const nestedResource = '';

const apiPurchaseMakePayment = new ApiCore({
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


export default apiPurchaseMakePayment;