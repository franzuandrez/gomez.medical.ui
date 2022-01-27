const { ApiCore } = require('../utilities/Core');

const url = 'v1/purchases_detail';
const plural = 'purchases_detail';
const single = 'purchases_detail';
const nestedResource = '';

const apiPurchaseDetail = new ApiCore({
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


export default apiPurchaseDetail;