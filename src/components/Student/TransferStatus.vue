<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Statut des Demandes de Transfert</h1>

    <!-- Liste des demandes de transfert -->
    <div v-if="transferRequests.length" class="space-y-6">
      <div
        v-for="request in transferRequests"
        :key="request.id"
        class="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between"
      >
        <div class="flex-1 space-y-2">
          <p class="text-lg font-medium text-gray-700">
            <span class="text-gray-500">École Actuelle :</span> {{ request.currentSchool }}
          </p>
          <p class="text-lg font-medium text-gray-700">
            <span class="text-gray-500">École de Destination :</span> {{ request.targetSchool }}
          </p>
          <div class="mt-2 flex items-center space-x-2">
            <!-- Badge du statut -->
            <span
              :class="statusBadgeClass(request.status)"
              class="text-sm font-semibold px-3 py-1 rounded-full"
            >
              {{ request.status }}
            </span>
          </div>
          <!-- Contact de l'administrateur -->
          <p class="text-gray-600 mt-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 10.5a8.38 8.38 0 0 1-.9 3.8l-1.47-1.47a5.5 5.5 0 1 0-7.76 7.76l1.47 1.47a8.5 8.5 0 1 1 8.66-11.56z"></path>
            </svg>
            <strong>Contact Administrateur :</strong>
            <a :href="'mailto:' + request.adminEmail" class="ml-2 text-blue-500 hover:underline">
              {{ request.adminEmail }}
            </a>
          </p>
        </div>
        <!-- Bouton S'inscrire si le statut est approuvé -->
        <div v-if="request.status === 'Approuvé'" class="mt-4 md:mt-0">
          <button
            @click="redirectToInscription"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>

    <!-- Message d'absence de demandes -->
    <div v-else class="text-gray-600 text-center mt-8">
      Aucune demande de transfert en cours.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transferRequests: [
        {
          id: 1,
          currentSchool: "École Saint-Louis",
          targetSchool: "Lycée Blaise Diagne",
          status: "En attente",
          adminEmail: "admin@ecolesaintlouis.com",
        },
        {
          id: 2,
          currentSchool: "Collège Moderne",
          targetSchool: "École Saint-Louis",
          status: "Approuvé",
          adminEmail: "admin@collegemoderne.com",
        },
      ],
    };
  },
  methods: {
    statusBadgeClass(status) {
      switch (status) {
        case "En attente":
          return "bg-yellow-100 text-yellow-700";
        case "Approuvé":
          return "bg-green-100 text-green-700";
        case "Refusé":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
    redirectToInscription() {
      // Redirection vers la page d'inscription
      this.$router.push("/student/dashboard/registration");
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
