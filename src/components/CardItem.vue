<template>
  <div class="bg-white shadow-lg rounded-lg min-h-[140px]">
    <div v-if="loading" class="flex h-full items-center justify-center">
      <LoadingIcon color="#000" :width="26" :height="26" />
    </div>
    <div v-else class="flex h-full">
      <div class="mx-6 my-3 w-full flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <div class="text-xl text-(--text-secondary-color) opacity-45">
            {{ title }}
          </div>
          <component :is="icon" :color="iconColor" />
        </div>
        <div class="text-4xl font-bold">
          <div v-if="title === 'Avaliações'">
            {{ quantity }}<span class="text-base font-normal">/5</span>
          </div>
          <div v-else>
            {{ quantity }}
          </div>
        </div>
        <div class="flex items-center text-base gap-4 ">
          <span class="flex items-center gap-1">
            <AndroidIcon :width="16" :height="16" />
            <span>{{ androidQuantity }}</span>
          </span>
          <span class="flex items-center gap-1">
            <IosIcon :width="16" :height="16" />
            <span>{{ iosQuantity }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';
import AndroidIcon from '@/assets/icons/AndroidIcon.vue';
import IosIcon from '@/assets/icons/IosIcon.vue';
import { defineComponent } from 'vue';


export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    androidQuantity: {
      type: String,
      default: '0'
    },
    iosQuantity: {
      type: String,
      default: '0'
    },
    icon: {
      type: Object,
      required: true
    },
    iconColor: {
      type: String,
      default: '#000000'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AndroidIcon,
    IosIcon,
    LoadingIcon
  }
})
</script>