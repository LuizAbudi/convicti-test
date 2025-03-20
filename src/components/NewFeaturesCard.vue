<template>
  <div class="bg-white shadow-lg rounded-lg h-[150px] overflow-auto">
    <div v-if="loading" class="flex h-full items-center justify-center">
      <LoadingIcon color="#000" :width="26" :height="26" />
    </div>
    <div v-else class="flex flex-col h-full">
      <div class="text-xl text-(--text-secondary-color) mx-6 my-3">
        Novas Funcionalidades
      </div>
      <table class="table-auto mx-6">
        <thead class="mb-1 text-xs text-left opacity-40">
          <tr>
            <th>Funcionalidade</th>
            <th class="px-2 py-2 text-right">Taxa de uso</th>
          </tr>
        </thead>
        <tbody class="text-base rounded-lg">
          <tr 
            v-for="(feature, index) in features" :key="feature.id" 
            :class="index % 2 === 0 ? 'bg-gray-100' : ''"
          >
            <td class="px-2 py-2 text-left align-text-top">{{ feature.name }}</td>
            <td class="px-2 py-2 text-right align-text-top text-[#00EC6D]">{{ feature.total_usage }}%</td>
          </tr>
        </tbody>
      </table>       
    </div>
  </div>
</template>


<script lang="ts">
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import type { Feature } from '@/services/StatisticsService';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    features: {
      type: Array as () => Feature[],
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
  },
  components: {
    LoadingIcon
  },
})
</script>