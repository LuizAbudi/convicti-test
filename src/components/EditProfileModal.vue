<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full p-5">
      <div class="flex items-center justify-between border-b pb-3">
        <h3 class="text-xl font-semibold ">Editar Perfil</h3>
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
            <span class="text-sm font-medium ">{{ permission.label }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permission.value" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-(--primary-color)"></div>
              <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>

        <div class="mt-6 flex justify-between gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 w-1/2 cursor-pointer">Voltar</button>
          <button @click="editProfile" class="px-4 py-2 bg-[#1400FF33] text-[#7F43FF] rounded-lg w-full cursor-pointer">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Profile } from '@/services/ProfileService';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  profile: Profile;
}>();

const emit = defineEmits(['close', 'edit']);

const options = ref<{ label: string; value: boolean }[]>([
  { label: 'Downloads', value: false },
  { label: 'Avaliações', value: false },
  { label: 'Erros', value: false },
  { label: 'Feedbacks', value: false },
  { label: 'Novas Funcionalidades', value: false },
]);

const localProfile = ref({ ...props.profile });

watchEffect(() => {
  if (props.profile && props.isOpen) {
  
    options.value = options.value.map(option => ({
      ...option,
      value: props.profile.permissions.some(permission => permission.name === option.label),
    }));
  }
});

const closeModal = () => {
  emit('close');
};

const editProfile = () => {
  if (props.profile) {
    emit('edit', { name: props.profile.name, options: options.value });
    closeModal();
  } else {
    console.error("Profile is undefined");
  }
};
</script>
