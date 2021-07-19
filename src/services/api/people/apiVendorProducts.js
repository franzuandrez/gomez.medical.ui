const { ApiCore } = require('../utilities/Core');

const url = 'v1/vendors';
const plural = 'vendors';
const single = 'vendor';
const nestedResource = 'products';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiVendorProducts = new ApiCore({
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


export default apiVendorProducts;