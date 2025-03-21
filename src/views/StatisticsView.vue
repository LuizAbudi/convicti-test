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

    <div class="flex flex-col gap-4 mt-6">
      <FeedbacksCard
        v-if="canViewFeedbacks"
        :evaluations="evaluations"
        :loading="loadingEvaluations"
      />
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <NewFeaturesCard
        v-if="canViewFeatures"
        :features="features"
        :loading="loadingFeatures"
      />
    </div>    
    <AppToaster :message="toastMessage.value" :show="showToast" @close="showToast = false" />
    <div v-if="cantView" class="flex items-center justify-center h-96">
      <p class="text-2xl font-semibold text-gray-500">Você não tem permissão para visualizar essas informações</p>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
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
import { useUserStore } from '@/stores/user';
import { useUsers } from '@/composables/useUsers';

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

const {
  fetchLoggedUser,
  loggedUser,
} = useUsers();

const { setUser } = useUserStore();

const showToast = ref(false);
const toastMessage = computed(() => errorDownloads || errorEvaluations || errorErrors || errorFeatures || '');

const canViewDownloads = ref(false);
const canViewEvaluations = ref(false);
const canViewErrors = ref(false);
const canViewFeatures = ref(false);
const canViewFeedbacks = ref(false);
const cantView = ref(false);

const userPermissions = ref<Set<string>>(new Set());

onMounted(async () => {
  // Espera o usuário ser carregado antes de configurar as permissões
  await fetchLoggedUser();
  setUser(loggedUser.value!);

  // Atualiza as permissões após o usuário ser carregado
  userPermissions.value = new Set(
    loggedUser.value?.profile?.permissions?.map((permission) => permission.name) ?? []
  );

  // Atualiza as permissões para a visualização
  canViewDownloads.value = userPermissions.value.has('Downloads');
  canViewEvaluations.value = userPermissions.value.has('Avaliações');
  canViewErrors.value = userPermissions.value.has('Erros');
  canViewFeatures.value = userPermissions.value.has('Novas Funcionalidades');
  canViewFeedbacks.value = userPermissions.value.has('Feedbacks');
  cantView.value = userPermissions.value.size === 0;

  // Faz as requisições após as permissões serem setadas
  if (canViewDownloads.value) fetchDownloads();
  if (canViewEvaluations.value || canViewFeedbacks.value) fetchEvaluations();
  if (canViewErrors.value) fetchErrors();
  if (canViewFeatures.value) fetchFeatures();
});

watch(toastMessage, (msg) => {
  showToast.value = !!msg;
});
</script>
