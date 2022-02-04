const { ApiCore } = require('../utilities/Core');

const url = 'v1/purchases';
const plural = 'purchases';
const single = 'purchase';
const nestedResource = 'payments';

const apiPurchase = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  nested: true,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource
});


export default apiPurchase;