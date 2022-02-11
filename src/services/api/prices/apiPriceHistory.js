const { ApiCore } = require('../utilities/Core');

const url = 'v1/price/history';
const plural = 'prices';
const single = 'prices';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiPriceHistory = new ApiCore({
  getAll: false,
  getSingle: true,
  post: false,
  put: false,
  patch: false,
  delete: false,
  nested: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,

});


export default apiPriceHistory;