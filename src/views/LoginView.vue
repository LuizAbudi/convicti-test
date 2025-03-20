<script setup lang="ts">
import { ref } from "vue";
import { loginService } from "@/services/LoginService";
import { useRouter } from "vue-router";

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
    router.push("/");
  } catch (error) {
    console.error(error);
    errorMessage.value = "Credenciais inválidas. Tente novamente.";
  } finally {
    isLoading.value = false;
  }
};
</script>

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
          class="w-80 h-12 p-4 bg-primary text-white font-semibold rounded-lg flex items-center justify-center transition-opacity duration-200 ease-in-out disabled:opacity-50"
          :disabled="isLoading"
          :class="{'pointer-events-none': isLoading}"
        >        
          <span v-if="isLoading">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-white fill-gray-800" viewBox="0 0 100 101" fill="none">\
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
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

<style scoped>
.text-primary {
  color: var(--primary-color);
}

.border-primary {
  border-color: var(--primary-color);
}
</style>
