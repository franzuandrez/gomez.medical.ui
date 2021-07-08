const { ApiCore } = require('../utilities/Core');

const url = 'v1/products';
const plural = 'products';
const single = 'product';
const nestedResource = '';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiProducts = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource
});


export default apiProducts;