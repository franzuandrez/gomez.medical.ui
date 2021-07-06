const { ApiCore } = require('../utilities/Core');

const url = 'v1/categories';
const plural = 'categories';
const single = 'category';
const nestedResource = 'subcategories';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiCategories = new ApiCore({
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


export default apiCategories;