import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { paginationParser } from "src/utils/pagination-parser";
import { urlBuilder } from "src/utils/url-builder";

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [] as any[],
    filter: {
      search: '',
    },
    pagination: {
      sortBy: 'created_at',
      descending: true,
      page: 1,
      rowsPerPage: 50,
      rowsNumber: 0
    },
    loading: true
  }),

  actions: {
    async fetch(options: any): Promise<void> {
      const travelURL = '/all-users';
      // if (this.loading) return

      try {
        const response = await api.get(urlBuilder(travelURL, Object.assign({
          search: options.filter.search || '',
        })))

        const { data, ...pagination } = response.data
        const paginate = {
          ...paginationParser(pagination),
          sortBy: options.pagination.sortBy,
          descending: options.pagination.descending
        }
        this.users = data
        this.pagination = paginate
      } catch (error) {
        console.log('error', error)
      } finally {
        this.loading = false
      }
    },

    async search(filterBy: Record<string, unknown>) {
      const filter = { ...this.filter, ...filterBy }
      const pagination = { ...this.pagination }

      await this.fetch({ filter, pagination })
    },

    resetFilter() {
      const filter = {search: ''}
      const pagination = {
        sortBy: 'created_at',
        descending: true,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 0
      }
      return {filter, pagination}
    }
  }
})
