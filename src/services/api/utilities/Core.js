import { apiProvider } from './Provider';

export class ApiCore {
  constructor(options) {
    if (options.getAll) {

      this.getAll = (query = '') =>
        apiProvider.getAll(options.url, query);

    }

    if (options.getSingle) {
      this.getSingle = (id) => apiProvider.getSingle(options.url, id);

    }

    if (options.post) {
      this.post = (model) => apiProvider.post(options.url, model);

    }


    if (options.put) {
      this.put = (model, id) => apiProvider.put(options.url, model, id);

    }

    if (options.patch) {
      this.patch = (model, id) => apiProvider.patch(options.url, model, id);

    }

    if (options.delete) {
      this.remove = (id) => apiProvider.remove(options.url, id);

    }

    if (options.nested) {

      this.nested = (id) =>

        apiProvider.nested(options.parentResource, options.nestedResource, id);


    }
    ;
  }
}