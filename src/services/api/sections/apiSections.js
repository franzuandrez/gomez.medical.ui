const { ApiCore } = require('../utilities/Core');

const url = 'v1/sections';
const plural = 'sections';
const single = 'section';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiSections = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  url,
  plural,
  single
});


export default apiSections;