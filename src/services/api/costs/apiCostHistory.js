const { ApiCore } = require('../utilities/Core');

const url = 'v1/cost/history';
const plural = 'costs';
const single = 'costs';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiCostHistory = new ApiCore({
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


export default apiCostHistory;