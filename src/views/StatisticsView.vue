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

    <div class="flex flex-col gap-4 mt-6">
      <NewFeaturesCard
        :features="features"
        :loading="loadingFeatures"
      />
    </div>    
    <AppToaster :message="toastMessage.value" :show="showToast" @close="showToast = false" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import InformationsCard from '@/components/InformationsCard.vue';
import FeedbacksCard from '@/components/FeedbacksCard.vue';
import NewFeaturesCard from '@/components/NewFeaturesCard.vue';
import AppToaster from '@/components/ui/AppToaster.vue';

import CloudArrowDownIcon from '@/assets/icons/CloudArrowDownIcon.vue';
import StarCommentIcon from '@/assets/icons/StarCommentIcon.vue';
import ErrorsIcon from '@/assets/icons/ErrorsIcon.vue';

import { useDownloads } from '@/composables/useDownloads';
import { useEvaluations } from '@/composables/useEvaluations';
import { useErrors } from '@/composables/useErrors';
import { useFeatures } from '@/composables/useFeatures';

const {
  totalDownloads,
  iosDownloads,
  androidDownloads,
  loading: loadingDownloads,
  error: errorDownloads,
  fetchDownloads,
} = useDownloads();

const {
  evaluations,
  averageEvaluation,
  iosEvaluations,
  androidEvaluations,
  loading: loadingEvaluations,
  error: errorEvaluations,
  fetchEvaluations,
} = useEvaluations();

const {
  totalErrors,
  iosErrors,
  androidErrors,
  loading: loadingErrors,
  error: errorErrors,
  fetchErrors,
} = useErrors();

const {
  features,
  loading: loadingFeatures,
  error: errorFeatures,
  fetchFeatures,
} = useFeatures();

const showToast = ref(false);
const toastMessage = computed(() => errorDownloads || errorEvaluations || errorErrors || errorFeatures || '')

onMounted(() => {
  fetchDownloads();
  fetchEvaluations();
  fetchErrors();
  fetchFeatures();
});

watch(toastMessage, (msg) => {
  showToast.value = !!msg;
});
</script>
