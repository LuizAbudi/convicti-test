<template>
  <div>
    <div class="w-[250px] pt-[45px] h-screen text-(--text-dashboard-color) border-r border-gray-400 flex flex-col p-6">
      <div class="flex items-center justify-center mb-8">
        <img src="../assets/logo.svg" alt="Logo" />
      </div>
      <div class="flex items-center justify-center text-(--text-dashboard-title-color) mb-3.5 font-bold text-sm">
        PAINEL DE DADOS
      </div>

      <ul>
        <li v-for="(item, index) in menuOptions" :key="index">
          <router-link 
            :to="item.route" 
            class="flex py-2 px-4 items-center" 
            :active-class="'rounded bg-(--secondary-color)'" 
            exact-active-class="rounded bg-(--secondary-color)"
          >
            <div class="mr-2 justify-center items-center">
              <component :is="item.icon" class="w-5 h-5 text-(--secundary-color)" />
            </div>
            {{ item.title }}
          </router-link>
        </li>        
      </ul>

      <div class="mt-auto mb-10">
        <ul>
          <li v-for="(footerItem, index) in footerOptions" :key="index">
            <div 
              v-if="footerItem.title === 'Sair'" 
              class="flex py-2 px-4 items-center cursor-pointer hover:bg-(--secondary-color) rounded"
              @click="handleLogout"
            >
              <div class="mr-2 justify-center items-center">
                <component :is="footerItem.icon" class="w-5 h-5 text-(--secundary-color)" />
              </div>
              {{ footerItem.title }}
            </div>

            <router-link 
              v-else
              :to="footerItem.route" 
              class="flex py-2 px-4 items-center hover:bg-(--secondary-color) rounded" 
              :active-class="'rounded bg-(--secondary-color)'" 
              exact-active-class="rounded bg-(--secondary-color)"
            >
              <div class="mr-2 justify-center items-center">
                <component :is="footerItem.icon" class="w-5 h-5 text-(--secundary-color)" />
              </div>
              {{ footerItem.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { HiOutlineLogout } from "vue-icons-plus/hi";
import { LuSettings } from "vue-icons-plus/lu";
import { RiDashboardHorizontalLine } from "vue-icons-plus/ri";

export default defineComponent({
  name: 'AppSidebar',
  components: {
    RiDashboardHorizontalLine,
    LuSettings,
    HiOutlineLogout,
  },
  setup() {
    const router = useRouter();

    
    const menuOptions = ref([
      {
        title: 'Dashboard',
        icon: 'RiDashboardHorizontalLine',
        route: '/',
      },
    ]);

    const footerOptions = ref([
      {
        title: 'Configurações',
        icon: 'LuSettings',
        route: '/settings',
      },
      {
        title: 'Sair',
        icon: 'HiOutlineLogout',
        route: '/logout',
      },
    ]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };

    return {
      menuOptions,
      footerOptions,
      handleLogout,
    };
  },
});
</script>
