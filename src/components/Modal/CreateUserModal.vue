<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full p-5">
      <div class="flex items-center justify-between p-1">
        <h3 class="text-xl font-semibold">Novo Usuário</h3>
      </div>
      <div class="p-4 space-y-4">
        <input type="text" v-model="name" class="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Nome do usuário" />
        <input type="text" v-model="email" class="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Email" />

        <div>
          <label class="block text-sm font-semibold mb-2">Perfil</label>
          <div class="space-y-2 overflow-auto h-28">
            <label v-for="profile in options" :key="profile.id" class="flex items-center justify-between gap-2 mr-3">
              <span class="text-sm">{{ profile.name }}</span>
              <input
                type="radio"
                :value="profile.id"
                v-model="profile_id"
                name="profile"
                class="form-radio text-blue-600"
              />
            </label>
          </div>
        </div>

        <div class="mt-6 flex justify-between gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 w-1/2 cursor-pointer">
            Voltar
          </button>
          <button @click="addUser" class="px-4 py-2 bg-[#1400FF33] text-[#7F43FF] rounded-lg w-full cursor-pointer">
            Adicionar
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-opacity-50">
      <LoadingIcon class="w-10 h-10 text-primary-color animate-spin" />
    </div>
  </div>
</template>


<script setup lang="ts">
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import type { Profile } from '@/services/ProfileService';
import { userService } from '@/services/UserService';
import { useReloadComponent } from '@/stores/reloadComponent';
import { defineProps, defineEmits, ref } from 'vue';

defineProps<{ 
  isOpen: boolean;
  options: Profile[];
}>();

const emit = defineEmits(['close', 'add']);

const name = ref('');
const email = ref('');
const profile_id = ref<number | null>(null);

const updateStore = useReloadComponent();
const loading = ref(false);

const closeModal = () => {
  emit('close');
  name.value = '';
  email.value = '';
  profile_id.value = null;
  updateStore.setShouldUpdate(true);
};

const addUser = async () => {
  if (!name.value || !email.value || !profile_id.value) {
    alert("Preencha todos os campos!");
    return;
  }

  loading.value = true;
  try {
    const addedUser = await userService.createUser({
      name: name.value,
      email: email.value,
      profile_id: profile_id.value,
    });
    emit('add', addedUser);
    closeModal();
  } catch (err) {
    console.warn("Erro ao criar o usuário:", err);
    closeModal();
  } finally {
    loading.value = false;
  }
};
</script>

