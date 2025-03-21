import { defineStore } from 'pinia';

export const useReloadComponent = defineStore('reload', {
  state: () => ({
    shouldUpdate: false,
  }),
  actions: {
    setShouldUpdate(value: boolean) {
      this.shouldUpdate = value;
    },
  },
});
