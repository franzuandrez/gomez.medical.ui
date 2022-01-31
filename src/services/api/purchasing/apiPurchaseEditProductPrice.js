const { ApiCore } = require('../utilities/Core');

const url = 'v1/purchase_product_price';
const plural = 'purchase_product_price';
const single = 'purchase_product_price';
const nestedResource = '';

const apiPurchaseEditProductPrice = new ApiCore({
  getAll: false,
  getSingle: false,
  post:false,
  put: false,
  patch: true,
  delete: true,
  nested: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,
});


export default apiPurchaseEditProductPrice;