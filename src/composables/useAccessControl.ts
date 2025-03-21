import { ref } from 'vue';
import type { User } from '@/services/UserService';
import { userService } from '@/services/UserService';

const loggedUser = ref<User | null>(null);
const loadingUser = ref(false);

export function useAccessControl() {
  const loadUser = async () => {
    if (!loggedUser.value) {
      loadingUser.value = true;
      try {
        const user = await userService.getLoggedUser();
        loggedUser.value = user;
      } catch (err) {
        console.error('Erro ao carregar usuário logado:', err);
      } finally {
        loadingUser.value = false;
      }
    }
  };

  const hasPermission = (permissionName: string): boolean => {
    if (!loggedUser.value) return false;

    return loggedUser.value.profile.permissions.some(
      (p) => p.name.toLowerCase() === permissionName.toLowerCase()
    );
  };

  return {
    loadUser,
    hasPermission,
    getLoggedUser: () => loggedUser.value,
    isLoading: () => loadingUser.value,
  };
}
