<template>
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Titre de la page -->
    <h2 class="text-3xl font-semibold text-gray-800 mb-8">Statut de la demande d'accès</h2>

    <!-- Statut de la demande -->
    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-gray-700">Statut de votre demande</h3>
        <span
          :class="statusClasses"
          class="text-sm font-medium px-3 py-1 rounded-full"
        >
          {{ statusText }}
        </span>
      </div>
      <p class="text-gray-600 mt-4">
        {{ statusMessage }}
      </p>
    </div>

    <!-- Informations de l'école assignée -->
    <div v-if="status === 'approved'" class="bg-white shadow rounded-lg p-6 mb-8">
      <h3 class="text-xl font-semibold text-gray-700">École assignée</h3>
      <p class="text-gray-600 mt-4">
        Vous avez été assigné(e) à <span class="font-semibold">{{ assignedSchool.name }}</span>.
      </p>

      <!-- Coordonnées de l'administrateur -->
      <div class="mt-6">
        <h4 class="text-lg font-medium text-gray-700">Coordonnées de l’administrateur</h4>
        <p class="text-gray-600 mt-2">Nom : {{ assignedSchool.adminName }}</p>
        <p class="text-gray-600">Email : <a :href="'mailto:' + assignedSchool.adminEmail" class="text-blue-600">{{ assignedSchool.adminEmail }}</a></p>
        <p class="text-gray-600">Téléphone : <a :href="'tel:' + assignedSchool.adminPhone" class="text-blue-600">{{ assignedSchool.adminPhone }}</a></p>
      </div>

      <!-- Option basée sur le statut -->
      <button
        @click="handleApprovedAction"
        class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {{ approvedButtonText }}
      </button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // Statut de la demande ('pending', 'approved', 'rejected')
      status: 'approved', // Modifier pour tester différents états
      assignedSchool: {
        name: 'École Saint-Louis',
        adminName: 'Mamadou Faye',
        adminEmail: 'mamadou.faye@ecolesaintlouis.com',
        adminPhone: '+221 77 123 45 67',
      },
    };
  },
  computed: {
    statusText() {
      switch (this.status) {
        case 'pending':
          return 'En attente';
        case 'approved':
          return 'Approuvé';
        case 'rejected':
          return 'Refusé';
        default:
          return '';
      }
    },
    statusClasses() {
      switch (this.status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'approved':
          return 'bg-green-100 text-green-800';
        case 'rejected':
          return 'bg-red-100 text-red-800';
        default:
          return '';
      }
    },
    statusMessage() {
      switch (this.status) {
        case 'pending':
          return 'Votre demande est en attente de traitement. Veuillez patienter.';
        case 'approved':
          return 'Votre demande a été approuvée. Vous pouvez maintenant accéder à l’école assignée.';
        case 'rejected':
          return 'Votre demande a été refusée. Pour plus d’informations, contactez l’administrateur.';
        default:
          return '';
      }
    },
    approvedButtonText() {
      return this.status === 'approved' ? "S'inscrire" : 'Demander un transfert';
    },
  },
  methods: {
    handleApprovedAction() {
      if (this.status === 'approved') {
        // Rediriger vers la page d'inscription
        this.$router.push('/student/dashboard/registration');
      } else {
        console.log('Demande de transfert initiée');
        // Logique de demande de transfert ici
      }
    },
  },
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
