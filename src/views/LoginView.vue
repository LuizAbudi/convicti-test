<template>
  <main class="h-screen flex flex-row items-center overflow-hidden">
    <div class="flex absolute top-0 left-0 w-full p-8">
      <div class="flex flex-col items-center justify-center m-0">
        <img src="../assets/logo.svg" alt="Logo"/>
        <div class="text-xl font-semibold text-black inline-flex leading-tight tracking-normal">
          CONVIC
          <span class="text-primary">TI</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-1/2 ml-33">
      <div class="mb-7">
        <h1 class="text-2xl font-semibold text-black">Bem-vindo de Volta</h1>
        <p class="text-xs opacity-50 font-semibold text-black">Insira suas credenciais para acessar a plataforma</p>
      </div>
      <form class="flex flex-col" @submit.prevent="handleLogin">
        <input 
          v-model="username"
          type="text" 
          placeholder="Seu e-mail" 
          class="w-80 h-12 p-4 mb-2 border border-gray-300 rounded-lg"
        />
        <input 
          v-model="password"
          type="password" 
          placeholder="Sua senha" 
          class="w-80 h-12 p-4 mb-3 border border-gray-300 rounded-lg"
        />
        <button 
          type="submit" 
          class="w-80 h-12 p-4 bg-(--primary-color) text-white font-semibold rounded-lg flex items-center justify-center transition-opacity duration-200 ease-in-out disabled:opacity-50"
          :disabled="isLoading"
          :class="{'pointer-events-none': isLoading}"
        >        
          <span v-if="isLoading">
            <LoadingIcon color="#000" :width="24" :height="24" />
          </span>
          <span v-else>Entrar</span>
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>

    <div class="flex items-center w-full h-full relative">
      <img src="../assets/dashboard-image.png" alt="Login" class="absolute ml-30"/>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loginService } from "@/services/LoginService";
import { useRouter } from "vue-router";
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import { useUserStore } from "@/stores/user";
import { useUsers } from "@/composables/useUsers";

const { setUser } = useUserStore();
const { loggedUser, fetchLoggedUser } = useUsers();

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;

  try {
    const response = await loginService.login({
      username: username.value,
      password: password.value,
    });

    localStorage.setItem("token", response.access_token);
    await fetchLoggedUser();
    setUser(loggedUser.value!);  
    router.push("/");
  } catch (error) {
    console.error(error);
    errorMessage.value = "Credenciais inválidas. Tente novamente.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.text-primary {
  color: var(--primary-color);
}

.border-primary {
  border-color: var(--primary-color);
}
</style>
