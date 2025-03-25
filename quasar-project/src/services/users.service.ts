import { api } from 'src/boot/axios'

export class userService {
  createQuery(options: any) {
    const query: any = {
      page: options.pagination.page,
      limit: options.pagination.rowsPerPage,
      search: options.filter.search as string,
      fidelity: options.filter.fidelity ? 'true' : '',
      sort: `${options.pagination.descending ? '-' : ''}${
        options.pagination.sortBy
      }`
    }

    return query
  }

  async getByClientId(clientID: number) {
    return await api.get(`/client/${clientID}/orders`)
  }
}
