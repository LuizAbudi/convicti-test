<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full p-5">
      <div class="flex items-center justify-between p-1">
        <h3 class="text-xl font-semibold ">
          Novo Perfil
        </h3>
      </div>
      <div class="p-4">
        <div>
          <input type="text" id="name" v-model="name" class="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Novo perfil" />
        </div>
        <div class="mt-4 space-y-3">
          <label class="text-xs opacity-40">Dashboard</label>
          <div v-for="(option, index) in options" :key="index" class="flex justify-between items-center">
            <span class="text-sm font-medium ">{{ option.label }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="option.value" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-(--primary-color)"></div>
              <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>
        <div class="mt-6 flex justify-between gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 w-1/2 cursor-pointer">Voltar</button>
          <button @click="addProfile" class="px-4 py-2 bg-[#1400FF33] text-[#7F43FF] rounded-lg w-full cursor-pointer">Adicionar</button>
        </div>
      </div>
    </div>
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-opacity-50">
      <LoadingIcon class="w-10 h-10 text-primary-color animate-spin"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import { profileService } from '@/services/ProfileService';
import { useReloadComponent } from '@/stores/reloadComponent';
import { ref } from 'vue';

defineProps<{ 
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'add']);

const name = ref('');
const options = ref<{ label: string; value: boolean; id: number }[]>([
  { label: 'Downloads', value: false, id: 1 },
  { label: 'Avaliações', value: false, id: 2 },
  { label: 'Erros', value: false, id: 3 },
  { label: 'Feedbacks', value: false, id: 4 },
  { label: 'Novas Funcionalidades', value: false, id: 5 },
]);

const updateStore = useReloadComponent();

const closeModal = () => {
  emit('close');
  name.value = '';
  options.value = options.value.map((option) => ({ ...option, value: false }));
  updateStore.setShouldProfileUpdate(true);
};

const loading = ref(false);

const addProfile = async () => {
  loading.value = true;
  try {
    const addedProfile = await profileService.createProfile({
      name: name.value,
      permissions: options.value.filter(opt => opt.value).map(opt => opt.id),
    });
    emit('add', addedProfile);
    closeModal();
  } catch (err) {
    console.warn("Erro ao criar o perfil:", err);
    closeModal();
  } finally {
    loading.value = false;
  }
};
</script>
