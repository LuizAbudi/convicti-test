<template>
  <DefaultLayout>
    <div>
      <h1 class="text-3xl font-bold">Estatísticas</h1>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <InformationsCard 
        title="Downloads"
        :quantity="totalDownloads.toString()"
        :icon="CloudArrowDownIcon"
        iconColor="#0578BE"
        :loading="loadingDownloads"
        :iosQuantity="iosDownloads.toString()"
        :androidQuantity="androidDownloads.toString()"
      />
      <InformationsCard
        title="Avaliações"
        :quantity="averageEvaluation.toPrecision(2).toString()"
        :icon="StarCommentIcon"
        iconColor="#C500D6"
        :loading="loadingEvaluations"
        :iosQuantity="iosEvaluations.toString()"
        :androidQuantity="androidEvaluations.toString()"
      />
      <InformationsCard 
        title="Erros"
        :quantity="totalErrors.toString()"
        :icon="ErrorsIcon"
        iconColor="#FF5050"
        :loading="loadingErrors"
        :iosQuantity="iosErrors.toString()"
        :androidQuantity="androidErrors.toString()"
      />
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <FeedbacksCard
        :evaluations="evaluations"
        :loading="loadingEvaluations"
      />
    </div>

    <div 
      id="toast-danger"
      v-if="errorDownloads || errorEvaluations || errorErrors" 
      class="fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm top-5 right-5"
      role="alert"
    >
      <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
          </svg>
      </div>
      <div class="ms-3 text-sm font-normal">
          {{ errorErrors || errorDownloads || errorEvaluations }}
      </div>
      <div 
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
        aria-label="Close"
        @click="removeToast">
        <span class="sr-only">Fechar</span>
        <svg class="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import InformationsCard from '@/components/InformationsCard.vue';
import CloudArrowDownIcon from '@/assets/icons/CloudArrowDownIcon.vue';
import StarCommentIcon from '@/assets/icons/StarCommentIcon.vue';
import ErrorsIcon from '@/assets/icons/ErrorsIcon.vue';
import { useErrors } from '@/composables/useErrors';
import { useDownloads } from '@/composables/useDownloads';
import { useEvaluations } from '@/composables/useEvaluations';
import FeedbacksCard from '@/components/FeedbacksCard.vue';

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
    evaluations,
    loading: loadingEvaluations,
    error: errorEvaluations,
    averageEvaluation,
    iosEvaluations,
    androidEvaluations,
  } = useEvaluations();

  function removeToast() {
    const toast = document.getElementById('toast-danger');
    if (toast) {
      toast.remove();
    }
  }
</script>
