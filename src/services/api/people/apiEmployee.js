
const { ApiCore } = require('../utilities/Core');

const url = 'v1/employees';
const plural = 'employees';
const single = 'employee';
const nestedResource = '';


const apiEmployee = new ApiCore({
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


export default apiEmployee;