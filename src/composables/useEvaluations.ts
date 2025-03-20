import { ref, onMounted } from "vue";
import { statisticsService } from "@/services/StatisticsService";
import type { Evaluation } from "@/services/StatisticsService";

export function useEvaluations() {
  const evaluations = ref<Evaluation[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const page = ref(1);
  const lastPage = ref(1);
  const averageEvaluation = ref(0);
  const iosEvaluations = ref(0);
  const androidEvaluations = ref(0);

  const fetchEvaluations = async () => {
    try {
      const response = await statisticsService.getEvaluations(page.value);
      evaluations.value = [...evaluations.value, ...response.data.data];
      lastPage.value = response.data.last_page;

      if (page.value < lastPage.value) {
        page.value++;
        await fetchEvaluations();
      }
    } catch (err) {
      error.value = "Erro ao buscar avaliações";
      console.error(err);
    } finally {
      if (page.value === lastPage.value) {
        calculateAverage();
        calculatePlatformCounts();
        loading.value = false;
      }
    }
  };

  const calculateAverage = () => {
    if (evaluations.value.length > 0) {
      const total = evaluations.value.reduce((sum, evaluation) => sum + evaluation.evaluation, 0);
      averageEvaluation.value = total / evaluations.value.length;
    }
  };

  const calculatePlatformCounts = () => {
    iosEvaluations.value = evaluations.value.filter(evaluation => evaluation.platform === "IOS").length;
    androidEvaluations.value = evaluations.value.filter(evaluation => evaluation.platform === "ANDROID").length;
  };

  onMounted(fetchEvaluations);

  return {
    evaluations,
    loading,
    error,
    averageEvaluation,
    iosEvaluations,
    androidEvaluations,
  };
}
