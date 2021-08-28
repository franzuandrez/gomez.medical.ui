const { ApiCore } = require('../utilities/Core');

const url = 'v1/purchases_locate_products';
const plural = 'purchases_locate_products';
const single = 'purchases_locate_products';
const nestedResource = '';

const apiPurchasesLocateProducts = new ApiCore({
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


export default apiPurchasesLocateProducts;