const { ApiCore } = require('../utilities/Core');

const url = 'v1/brands';
const plural = 'brands';
const single = 'brands';
const nestedResource = '';

const apiBrand = new ApiCore({
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


export default apiBrand;