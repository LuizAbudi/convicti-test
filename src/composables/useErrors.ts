import { ref, onMounted } from "vue";
import { statisticsService } from "@/services/StatisticsService";
import type { Error } from "@/services/StatisticsService";

export function useErrors() {
  const errors = ref<Error[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const page = ref(1);
  const lastPage = ref(1);
  const totalErrors = ref(0);
  const iosErrors = ref(0);
  const androidErrors = ref(0);

  const fetchErrors = async () => {
    try {
      const response = await statisticsService.getErrors(page.value);
      errors.value = [...errors.value, ...response.data.data];
      lastPage.value = response.data.last_page;

      if (page.value < lastPage.value) {
        page.value++;
        await fetchErrors();
      }
    } catch (err) {
      error.value = "Erro ao buscar erros";
      console.error(err);
    } finally {
      if (page.value === lastPage.value) {
        calculateTotals();
        loading.value = false;
      }
    }
  };

  const calculateTotals = () => {
    totalErrors.value = errors.value.length;
    iosErrors.value = errors.value.filter(error => error.platform === "IOS").length;
    androidErrors.value = errors.value.filter(error => error.platform === "ANDROID").length;
  };

  onMounted(fetchErrors);

  return {
    loading,
    error,
    totalErrors,
    iosErrors,
    androidErrors,
  };
}
