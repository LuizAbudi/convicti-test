import { userService, type User } from '@/services/UserService';
import { onMounted, ref } from 'vue';

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const loggedUser = ref<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await userService.getUsers();
      users.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar usuários";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchLoggedUser = async () => {
    try {
      const response = await userService.getLoggedUser();
      loggedUser.value = response
    } catch (err) {
      error.value = "Erro ao buscar usuário logado";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchLoggedUser();
  });

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchLoggedUser,
    loggedUser
  };
}
