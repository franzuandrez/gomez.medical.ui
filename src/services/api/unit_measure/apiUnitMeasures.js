const { ApiCore } = require('../utilities/Core');

const url = 'v1/unit_measures';
const plural = 'unit_measures';
const single = 'unit_measures';
const nestedResource = '';

const apiUnitMeasures = new ApiCore({
  getAll: true,
  getSingle: false,
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


export default apiUnitMeasures;