<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">Editar Usuário</h3>
      </div>
      <div class="p-4 space-y-4" v-if="user">
        <input 
          type="text" 
          v-model="name" 
          class="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Nome do usuário"
        />
        <input 
          type="text" 
          v-model="email" 
          class="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Email"
        />
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-600">Perfil</label>
          <div class="space-y-2 overflow-auto h-32">
            <label 
              v-for="profile in options" 
              :key="profile.id" 
              class="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <input
                type="radio"
                :value="profile.id"
                v-model="profile_id"
                name="profile"
                class="hidden"
              />
              <div 
                class="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center"
                :class="{'border-purple-500': profile_id === profile.id}"
              >
                <div 
                  class="w-3 h-3 bg-purple-500 rounded-full"
                  v-if="profile_id === profile.id"
                ></div>
              </div>
              <span class="text-sm text-gray-700">{{ profile.name }}</span>
            </label>
          </div>
        </div>
        <div class="mt-6 flex justify-between gap-2">
          <button 
            @click="closeModal" 
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 w-1/2 cursor-pointer"
          >
            Voltar
          </button>

          <button 
            @click="updateUser" 
            class="px-4 py-2 bg-purple-200 text-purple-700 font-semibold rounded-lg w-full cursor-pointer disabled:opacity-50"
            :disabled="!name || !email || !profile_id"
          >
            Salvar Alterações
          </button>
        </div>
      </div>

      <div v-else class="p-4 text-center text-gray-500">Carregando usuário...</div>
    </div>

    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-opacity-50">
      <LoadingIcon class="w-10 h-10 text-purple-500 animate-spin"/>
    </div>
    <transition name="fade">
      <div v-if="showError" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-opacity-40">
        <div class="bg-red-500 text-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
          <p class="text-lg font-semibold">Erro ao atualizar o usuário!</p>
          <button 
            @click="closeError"
            class="mt-4 px-4 py-2 bg-white text-red-500 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import type { Profile } from '@/services/ProfileService';
import type { User } from '@/services/UserService';
import { userService } from '@/services/UserService';

const props = defineProps<{ 
  isOpen: boolean;
  user: User | null;
  options: Profile[];
}>();

const emit = defineEmits(['close', 'update']);

const name = ref('');
const email = ref('');
const profile_id = ref<number | null>(null);
const loading = ref(false);
const showError = ref(false);

const closeModal = () => {
  emit('close');
};

const updateUser = async () => {
  if (!props.user || !name.value || !email.value || !profile_id.value) {
    alert("Preencha todos os campos!");
    return;
  }

  loading.value = true;
  try {
    const updatedUser = await userService.updateUser(props.user.id, {
      name: name.value,
      email: email.value,
      profile_id: profile_id.value,
    });
    emit('update', updatedUser);
    closeModal();
  } catch (err) {
    showError.value = true;
    console.warn("Erro ao atualizar o usuário:", err);
  } finally {
    loading.value = false;
  }
};

const closeError = () => {
  showError.value = false;
  closeModal();
};

watch(() => props.user, (newUser) => {
  if (newUser) {
    name.value = newUser.name;
    email.value = newUser.email;
    profile_id.value = newUser.profile_id;
  } else {
    name.value = '';
    email.value = '';
    profile_id.value = null;
  }
}, { immediate: true });
</script>
