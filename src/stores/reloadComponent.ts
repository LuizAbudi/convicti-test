import { defineStore } from 'pinia';

export const useReloadComponent = defineStore('reload', {
  state: () => ({
    shouldProfileUpdate: false,
    shouldCardUpdate: false,
  }),
  actions: {
    setShouldProfileUpdate(value: boolean) {
      this.shouldProfileUpdate = value;
    },

    setShouldCardUpdate(value: boolean) {
      this.shouldCardUpdate = value;
    },
  },
});
