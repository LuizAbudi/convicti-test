<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full p-5">
      <div class="flex items-center justify-between border-b pb-3">
        <h3 class="text-xl font-semibold">Editar Perfil</h3>
      </div>
      <div class="p-4">
        <div>
          <input 
            type="text" 
            id="name" 
            v-model="localProfile.name" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg" 
          />
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="(permission, index) in options" :key="index" class="flex justify-between items-center">
            <span class="text-sm font-medium">{{ permission.label }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permission.value" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-(--primary-color)"></div>
              <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>
        <div class="mt-6 flex justify-between gap-2">
          <button 
            @click="closeModal" 
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 w-1/2 cursor-pointer"
            :disabled="loading"
          >
            Voltar
          </button>
          <button 
            @click="editProfile" 
            class="px-4 py-2 bg-[#1400FF33] text-[#7F43FF] rounded-lg w-1/2 cursor-pointer"
            :disabled="loading"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-opacity-50">
      <LoadingIcon class="w-10 h-10 text-primary-color animate-spin"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { profileService, type Profile } from '@/services/ProfileService';
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import { useReloadComponent } from '@/stores/reloadComponent';

const props = defineProps<{
  isOpen: boolean;
  profile: Profile;
}>();

const emit = defineEmits(['close', 'edit']);

const options = ref<{ label: string; value: boolean; id: number }[]>([
  { label: 'Downloads', value: false, id: 1 },
  { label: 'Avaliações', value: false, id: 2 },
  { label: 'Erros', value: false, id: 3 },
  { label: 'Feedbacks', value: false, id: 4 },
  { label: 'Novas Funcionalidades', value: false, id: 5 },
]);

const localProfile = ref<Profile>({
  id: 0,
  name: '',
  created_at: '',
  updated_at: '',
  total_users: 0,
  permissions: [],
});

watchEffect(() => {
  if (props.profile && props.isOpen) {
    localProfile.value = { ...props.profile };
    options.value = options.value.map(option => ({
      ...option,
      value: props.profile.permissions.some(permission => permission.name === option.label),
    }));
  }
});

const updateStore = useReloadComponent();

const closeModal = () => {
  emit('close');
  updateStore.setShouldProfileUpdate(true);
};

const loading = ref(false);

const editProfile = async () => {
  loading.value = true;
  try {
    const updatedProfile = await profileService.updateProfile(localProfile.value.id, {
      name: localProfile.value.name,
      permissions: options.value.filter(opt => opt.value).map(opt => opt.id),
    });
    emit('edit', updatedProfile);
    closeModal();
  } catch (err) {
    console.warn("Erro ao atualizar o perfil:", err);
    closeModal();
  } finally {
    loading.value = false;
  }
};
</script>

