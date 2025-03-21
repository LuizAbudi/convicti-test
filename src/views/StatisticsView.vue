<template>
  <DefaultLayout>
    <div>
      <h1 class="text-3xl font-bold">Estatísticas</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <InformationsCard
        v-if="canViewDownloads"
        title="Downloads"
        :quantity="totalDownloads.toString()"
        :icon="CloudArrowDownIcon"
        iconColor="#0578BE"
        :loading="loadingDownloads"
        :iosQuantity="iosDownloads.toString()"
        :androidQuantity="androidDownloads.toString()"
      />

      <InformationsCard
        v-if="canViewEvaluations"
        title="Avaliações"
        :quantity="averageEvaluation.toPrecision(2).toString()"
        :icon="StarCommentIcon"
        iconColor="#C500D6"
        :loading="loadingEvaluations"
        :iosQuantity="iosEvaluations.toString()"
        :androidQuantity="androidEvaluations.toString()"
      />

      <InformationsCard
        v-if="canViewErrors"
        title="Erros"
        :quantity="totalErrors.toString()"
        :icon="ErrorsIcon"
        iconColor="#FF5050"
        :loading="loadingErrors"
        :iosQuantity="iosErrors.toString()"
        :androidQuantity="androidErrors.toString()"
      />
    </div>

    <div class="flex flex-col gap-4 mt-6" v-if="canViewEvaluations">
      <FeedbacksCard
        :evaluations="evaluations"
        :loading="loadingEvaluations"
      />
    </div>

    <div class="flex flex-col gap-4 mt-6" v-if="canViewFeatures">
      <NewFeaturesCard
        :features="features"
        :loading="loadingFeatures"
      />
    </div>

    <div
      v-if="!canViewDownloads && !canViewEvaluations && !canViewErrors && !canViewFeatures"
      class="mt-10 text-red-500 text-center font-medium"
    >
      Você não tem permissão para visualizar nenhuma estatística.
    </div>
    
    <AppToaster :message="toastMessage.value" :show="showToast" @close="showToast = false" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
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
import { useAccessControl } from '@/composables/useAccessControl';

const {
  totalDownloads,
  iosDownloads,
  androidDownloads,
  loading: loadingDownloads,
  error: errorDownloads,
} = useDownloads();

const {
  evaluations,
  averageEvaluation,
  iosEvaluations,
  androidEvaluations,
  loading: loadingEvaluations,
  error: errorEvaluations,
} = useEvaluations();

const {
  totalErrors,
  iosErrors,
  androidErrors,
  loading: loadingErrors,
  error: errorErrors,
} = useErrors();

const {
  features,
  loading: loadingFeatures,
  error: errorFeatures,
} = useFeatures();

const { loadUser, hasPermission } = useAccessControl();

const canViewDownloads = ref(false);
const canViewEvaluations = ref(false);
const canViewErrors = ref(false);
const canViewFeatures = ref(false);

onMounted(async () => {
  await loadUser();
  canViewDownloads.value = hasPermission('Downloads');
  canViewEvaluations.value = hasPermission('Avaliações');
  canViewErrors.value = hasPermission('Erros');
  canViewFeatures.value = hasPermission('Novas Funcionalidades');
});

const showToast = ref(false);
const toastMessage = computed(() => errorDownloads || errorEvaluations || errorErrors || errorFeatures || '')

watch(toastMessage, (msg) => {
  showToast.value = !!msg;
});
</script>
