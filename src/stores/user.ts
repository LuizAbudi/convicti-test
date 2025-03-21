import { type User } from '@/services/UserService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();

  console.log(user)

  const setUser = (userData: User) => {
    user.value = userData;
  };

  return { user, setUser };
});