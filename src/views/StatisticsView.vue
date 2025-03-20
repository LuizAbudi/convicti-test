<template>
  <DefaultLayout>
      <div>
        <h1 class="text-3xl font-bold">Estatísticas</h1>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <CardItem 
          title="Downloads"
          :quantity="totalDownloads.toString()"
          :icon="CloudArrowDownIcon"
          iconColor="#0578BE"
          :loading="loadingDownloads"
          :iosQuantity="iosDownloads.toString()"
          :androidQuantity="androidDownloads.toString()"
        />
        <CardItem
          title="Avaliações"
          :quantity="averageEvaluation.toPrecision(2).toString()"
          :icon="StarCommentIcon"
          iconColor="#C500D6"
          :loading="loadingEvaluations"
          :iosQuantity="iosEvaluations.toString()"
          :androidQuantity="androidEvaluations.toString()"
        />
        <CardItem 
          title="Erros"
          :quantity="totalErrors.toString()"
          :icon="ErrorsIcon"
          iconColor="#FF5050"
          :loading="loadingErrors"
          :iosQuantity="iosErrors.toString()"
          :androidQuantity="androidErrors.toString()"
        />
      </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardItem from '@/components/CardItem.vue';
import CloudArrowDownIcon from '@/assets/icons/CloudArrowDownIcon.vue';
import StarCommentIcon from '@/assets/icons/StarCommentIcon.vue';
import ErrorsIcon from '@/assets/icons/ErrorsIcon.vue';
import { useErrors } from '@/composables/useErrors';
import { useDownloads } from '@/composables/useDownloads';
import { useEvaluations } from '@/composables/useEvaluations';

const {
    loading: loadingErrors,
    error: errorErrors,
    totalErrors,
    iosErrors,
    androidErrors,
  } = useErrors();

  const {
    loading: loadingDownloads,
    error: errorDownloads,
    totalDownloads,
    iosDownloads,
    androidDownloads,
  } = useDownloads();

  const {
    loading: loadingEvaluations,
    error: errorEvaluations,
    averageEvaluation,
    iosEvaluations,
    androidEvaluations,
  } = useEvaluations();

</script>
