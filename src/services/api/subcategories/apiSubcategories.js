const { ApiCore } = require('../utilities/Core');

const url = 'v1/subcategories';
const plural = 'subcategories';
const single = 'subcategories';
const nestedResource = '';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiSubcategories = new ApiCore({
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
  nestedResource
});


export default apiSubcategories;