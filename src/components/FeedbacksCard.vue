<template>
  <div class="bg-white shadow-lg rounded-lg h-[268px] overflow-auto">
    <div v-if="loading" class="flex h-full items-center justify-center">
      <LoadingIcon color="#000" :width="26" :height="26" />
    </div>
    <div v-else class="flex flex-col h-full">
      <div class="text-xl text-(--text-secondary-color) mx-6 my-3">
        Feedbacks
      </div>
      <table class="table-auto mx-6">
        <thead class="mb-1 text-xs text-left opacity-40">
          <tr>
            <th>Avaliação</th>
            <th class="px-2 py-2">Data</th>
            <th class="px-2 py-2">Avaliação</th>
            <th class="px-2 py-2">Melhorias</th>
            <th class="px-2 py-2">Plataforma</th>
          </tr>
        </thead>
        <tbody class="text-xs text-left align-text-top rounded-lg">
          <tr 
            v-for="(evaluation, index) in evaluations" :key="evaluation.id" 
            :class="index % 2 === 0 ? 'bg-gray-100' : ''"
          >
            <td class="px-2 py-2">{{ evaluation.description }}</td>
            <td class="px-2 py-2">{{ formatDate(evaluation.created_at) }}</td>
            <td class="px-2 py-2">{{ evaluation.evaluation }}</td>
            <td class="px-2 py-2 whitespace-pre-line">{{ evaluation.improvements }}</td>
            <td class="px-2 py-2">{{ evaluation.platform }}</td>
          </tr>
        </tbody>
      </table>  
    </div>
  </div>
</template>


<script lang="ts">
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import type { Evaluation } from '@/services/StatisticsService';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    evaluations: {
      type: Array as () => Evaluation[],      
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
  methods: {
    formatDate(dateString: string) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    },
  }
})
</script>