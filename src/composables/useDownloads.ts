import { ref } from "vue";
import { statisticsService } from "@/services/StatisticsService";
import type { Download } from "@/services/StatisticsService";

export function useDownloads() {
  const downloads = ref<Download[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const page = ref(1);
  const lastPage = ref(1);
  const totalDownloads = ref(0);
  const iosDownloads = ref(0);
  const androidDownloads = ref(0);

  const fetchDownloads = async () => {
    try {
      const response = await statisticsService.getDownloads(page.value);
      downloads.value = [...downloads.value, ...response.data.data];
      lastPage.value = response.data.last_page;

      if (page.value < lastPage.value) {
        page.value++;
        await fetchDownloads();
      }
    } catch (err) {
      error.value = "Erro ao buscar downloads";
      console.error(err);
    } finally {
      if (page.value === lastPage.value) {
        calculateTotals();
        loading.value = false;
      }
    }
  };

  const calculateTotals = () => {
    totalDownloads.value = downloads.value.length;
    iosDownloads.value = downloads.value.filter(download => download.platform === "IOS").length;
    androidDownloads.value = downloads.value.filter(download => download.platform === "ANDROID").length;
  };

  return {
    loading,
    error,
    totalDownloads,
    iosDownloads,
    androidDownloads,
    fetchDownloads,
  };
}
