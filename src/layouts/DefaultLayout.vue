<template>
  <div class="flex">
    <AppSidebar />

    <div class="flex-1 p-6">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppSidebar,
  },
};
</script>

<style scoped>
</style>
