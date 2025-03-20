<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardItem from '@/components/CardItem.vue';
import CloudArrowDownIcon from '@/assets/icons/CloudArrowDownIcon.vue';
import StarCommentIcon from '@/assets/icons/StarCommentIcon.vue';
import ErrorsIcon from '@/assets/icons/ErrorsIcon.vue';

</script>

<template>
  <DefaultLayout>
    <div>
      <h1 class="text-3xl font-bold">Estatísticas</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <CardItem title="Downloads" quantity="330" :icon="CloudArrowDownIcon" iconColor="#0578BE"/>
      <CardItem title="Avaliações" quantity="4.2" :icon="StarCommentIcon" iconColor="#C500D6" />
      <CardItem title="Erros" quantity="4" :icon="ErrorsIcon" iconColor="#FF5050" />
    </div>
  </DefaultLayout>
</template>
