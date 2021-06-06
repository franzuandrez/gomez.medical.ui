const { ApiCore } = require('../utilities/Core');

const url = 'v1/bins';
const plural = 'bins';
const single = 'bin';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiBins = new ApiCore({
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


export default apiBins;