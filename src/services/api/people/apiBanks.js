const { ApiCore } = require('../utilities/Core');

const url = 'v1/banks';
const plural = 'banks';
const single = 'banks';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiBanks = new ApiCore({
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


export default apiBanks;