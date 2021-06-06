const { ApiCore } = require('../utilities/Core');

const url = 'v1/racks';
const plural = 'racks';
const single = 'rack';
const nestedResource = 'levels';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiRacks = new ApiCore({
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


export default apiRacks;