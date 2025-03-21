import { profileService, type Profile } from '@/services/ProfileService';
import { ref } from 'vue';

export function useProfiles() {
  const profiles = ref<Profile[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchProfiles = async () => {
    try {
      const response = await profileService.getProfiles();
      profiles.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar perfis";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
  };
}
