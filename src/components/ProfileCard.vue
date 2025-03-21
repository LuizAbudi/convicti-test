<template>
  <div class="bg-white shadow-lg rounded-lg h-1/2 overflow-auto">
    <div v-if="loading" class="flex h-[200px] items-center justify-center">
      <LoadingIcon color="#000" :width="26" :height="26" />
    </div>
    <div v-else class="flex flex-col h-full max-h-1/2">
      <div class="flex justify-between items-center px-6 py-3">
        <div class="text-xl">Perfis</div>
        <div @click="openCreateProfileModal">
          <MdAddBox class="text-(--primary-color) w-8 h-8 cursor-pointer hover:text-[#5B59FF33]" />
        </div>
      </div>

      <table class="table-auto mx-6 mb-3">
        <thead class="mb-1 text-xs text-left opacity-40">
          <tr>
            <th>Nome</th>
            <th class="px-2 py-2">Quantidade De Usuários</th>
            <th class="px-2 py-2">Permissões</th>
          </tr>
        </thead>
        <tbody class="text-base rounded-lg">
          <tr v-for="(feature, index) in profiles" :key="feature.id" :class="index % 2 === 0 ? 'bg-gray-100' : ''">
            <td class="px-2 py-2 align-text-top">{{ feature.name }}</td>
            <td class="px-2 py-2 align-text-top">{{ feature.total_users }}</td>
            <td class="px-2 py-2 align-text-top">
              <div class="flex gap-2">
                <span v-for="permission in feature.permissions" :key="permission.id" class="bg-[#5B59FF33] px-3 py-1 rounded-full text-xs">
                  {{ permission.name }}
                </span>
              </div>
            </td>
            <td class="px-2 py-2 h-full">
              <div class="flex items-center h-full justify-center rounded-full p-1.5 hover:bg-[#5B59FF33]" @click="handleEditProfile(feature)">
                <EditProfileIcon :width="14" :height="14" color="primary-color" class="flex items-center justify-center"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>       
    </div>

    <CreateProfileModal 
      :isOpen="isCreateProfileModalOpen" 
      @close="isCreateProfileModalOpen = false" 
      @add="handleAddProfile" 
    />
    <EditProfileModal 
      :isOpen="isEditProfileModalOpen"
      :profile="selectedProfile!" 
      @close="handleCloseEditModal"
      @add="handleAddProfile" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditProfileIcon from '@/assets/icons/EditProfileIcon.vue';
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import { MdAddBox } from 'vue-icons-plus/md';
import CreateProfileModal from './CreateProfileModal.vue';
import type { Profile } from '@/services/ProfileService';
import EditProfileModal from './EditProfileModal.vue';
import { useReloadComponent } from '@/stores/reloadComponent';

defineProps<{ 
  profiles: Profile[]; 
  loading: boolean;
}>();

const isCreateProfileModalOpen = ref(false);
const isEditProfileModalOpen = ref(false);
const selectedProfile = ref<Profile>();
const updateStore = useReloadComponent();

const openCreateProfileModal = () => {
  isCreateProfileModalOpen.value = true;
};

const openEditProfileModal = () => {
  isEditProfileModalOpen.value = true;
};

const handleAddProfile = (profile: { name: string; options: { label: string; value: boolean }[] }) => {
  console.log('Novo perfil adicionado:', profile);
  isCreateProfileModalOpen.value = false;
};

const handleEditProfile = (profile: Profile) => {
  selectedProfile.value = profile;
  openEditProfileModal();
};

const handleCloseEditModal = () => {
  isEditProfileModalOpen.value = false;
  updateStore.setShouldUpdate(true);
};
</script>
