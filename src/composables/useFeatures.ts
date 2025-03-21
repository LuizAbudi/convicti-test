import { statisticsService, type Feature } from '@/services/StatisticsService';
import { ref } from 'vue';

export function useFeatures() {
  const features = ref<Feature[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const page = ref(1);
  const lastPage = ref(1);
  const isNew = 1;

  const fetchFeatures = async () => {
    try {
      const response = await statisticsService.getFeatures(page.value, isNew);
      features.value = [...features.value, ...response.data.data];
      lastPage.value = response.data.last_page;

      if (page.value < lastPage.value) {
        page.value++;
        await fetchFeatures();
      }
    } catch (err) {
      error.value = "Erro ao buscar funcionalidades";
      console.error(err);
    } finally {
      if (page.value === lastPage.value) {
        loading.value = false;
      }
    }
  };

  return {
    features,
    loading,
    error,
    fetchFeatures,
  };
}