import { userService, type User } from '@/services/UserService';
import { ref } from 'vue';

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

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

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}
