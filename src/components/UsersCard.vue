<template>
  <div class="bg-white shadow-lg rounded-lg h-1/2 max-h-[350px] overflow-auto">
    <div v-if="loading" class="flex h-[200px] items-center justify-center">
      <LoadingIcon color="#000" :width="26" :height="26" />
    </div>
    <div v-else class="flex flex-col h-full max-h-1/2">
      <div class="flex justify-between items-center px-6 py-3">
        <div class="text-xl">Usuários</div>
        <div @click="openCreateUserModal">
          <MdAddBox class="text-(--primary-color) w-8 h-8 cursor-pointer hover:text-[#5B59FF33]" />
        </div>
      </div>

      <table class="table-auto mx-6 mb-3">
        <thead class="mb-1 text-xs text-left opacity-40">
          <tr>
            <th>Nome</th>
            <th class="px-2 py-2">Email</th>
            <th class="px-2 py-2">Perfil</th>
            <th class="px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody class="text-base rounded-lg">
          <tr v-for="(feature, index) in users" :key="feature.id" :class="index % 2 === 0 ? 'bg-gray-100' : ''">
            <td class="px-2 py-2 align-text-top">{{ feature.name }}</td>
            <td class="px-2 py-2 align-text-top">{{ feature.email }}</td>
            <td class="px-2 py-2 align-text-top">{{ feature.profile.name }}</td>
            <td v-if="feature.active === true" class="text-center">
              <span class="px-2 py-2 rounded-xl w-full align-text-top text-green-500 bg-[#CCFFE3]">
                Ativo
              </span>
            </td>
            <td v-else class="px-2 py-2 align-text-top text-red-500 bg-[#ffacac]">Inativo</td>
            <td class="px-2 py-2 h-full">
              <div class="flex items-center h-full justify-center rounded-full p-1.5 hover:bg-[#5B59FF33]" @click="handleEditUser(feature)">
                <EditProfileIcon :width="14" :height="14" color="primary-color" class="flex items-center justify-center"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>       
    </div>

    <CreateUserModal
      :isOpen="isCreateUserModalOpen"
      :options="profiles"
      @close="isCreateUserModalOpen = false" 
      @add="handleAddUser" 
    />
    <EditUserModal
      :isOpen="isEditUserModalOpen"
      :user="selectedUser!"
      :options="profiles"
      @close="handleCloseEditModal"
      @add="handleAddUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditProfileIcon from '@/assets/icons/EditProfileIcon.vue';
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import { MdAddBox } from 'vue-icons-plus/md';
import { useReloadComponent } from '@/stores/reloadComponent';
import type { User } from '../services/UserService';
import type { Profile } from '@/services/ProfileService';
import CreateUserModal from './Modal/CreateUserModal.vue';
import EditUserModal from './Modal/EditUserModal.vue';

defineProps<{ 
  users: User[];
  profiles: Profile[]; 
  loading: boolean;
}>();

const isCreateUserModalOpen = ref(false);
const isEditUserModalOpen = ref(false);
const selectedUser = ref<User | null>(null);
const updateStore = useReloadComponent();

const openCreateUserModal = () => {
  isCreateUserModalOpen.value = true;
};

const openEditUserModal = () => {
  isEditUserModalOpen.value = true;
};

const handleAddUser = (profile: { name: string; options: { label: string; value: boolean }[] }) => {
  console.log('Novo perfil adicionado:', profile);
  isCreateUserModalOpen.value = false;
};

const handleEditUser = (user: User) => {
  selectedUser.value = user;
  openEditUserModal();
};

const handleCloseEditModal = () => {
  isEditUserModalOpen.value = false;
  updateStore.setShouldCardUpdate(true);
};
</script>
