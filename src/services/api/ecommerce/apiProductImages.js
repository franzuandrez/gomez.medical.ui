const { ApiCore } = require('../utilities/Core');

const url = 'v1/product/images';
const plural = 'images';
const single = 'image';
const nestedResource = '';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiProductImages = new ApiCore({
  getAll: false,
  getSingle: false,
  post: false,
  put: false,
  patch: false,
  delete: true,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource
});


export default apiProductImages;