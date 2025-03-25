import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useOptionsStore = defineStore('optionsStore', {
  state: () => ({
    options: {
      wallet: false
    }
  }),

  actions: {
    async getOptions() {
      const response = await api.get('/options')
      this.options = response.data
    },

    async optionChange(value: boolean) {
      await api.put('/options', {
        wallet: value
      })
      await this.getOptions()
    }
  }
})
