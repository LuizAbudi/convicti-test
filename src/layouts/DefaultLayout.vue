<template>
  <div class="flex">
    <AppSidebar />

    <div class="flex-1 bg-gray-50 p-12 overflow-auto max-h-screen">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';

</script>

<style scoped>
</style>
