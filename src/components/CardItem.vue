<template>
  <div class="bg-white shadow-lg rounded-lg">
    <div class="flex items-center">
      <div class="mx-6 my-3 w-full">
        <div class="flex justify-between items-center">
          <div class="text-xl text-(--text-secondary-color) opacity-45">
            {{ title }}
          </div>
          <component :is="icon" :color="iconColor" />
        </div>
        <div class="text-4xl font-bold">
          {{ quantity }}
        </div>
        <div class="flex">
          <div class="flex items-center text-(--text-secondary-color) justify-center gap-3">
            <div class="flex items-center justify-center">
              <MdAndroid class="color-(#00EC6D) w-5 h-5" />
              10
            </div>
            <div class="flex items-center justify-center ">
              <BsApple class="w-5 h-5"/>
              10
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MdAndroid } from 'vue-icons-plus/md';
import { BsApple } from 'vue-icons-plus/bs';


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
    icon: {
      type: Object,
      required: true
    },
    iconColor: {
      type: String,
      default: '#000000'
    }
  },
  components: {
    MdAndroid,
    BsApple
  }
})
</script>