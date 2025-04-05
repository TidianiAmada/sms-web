<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6">Gestion des Sessions d'Inscription</h2>
      
      <!-- Formulaire de session d'enregistrement -->
      <form @submit.prevent="saveSession" class="space-y-6">
        
        <!-- Nom de la session -->
        <div>
          <label for="sessionName" class="block text-sm font-medium text-gray-600">Nom de la session</label>
          <input
            id="sessionName"
            v-model="session.sessionName"
            type="text"
            placeholder="Inscription 2024 - 2025"
            class="mt-2 px-4 py-2 w-full bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Dates de la session -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-600">Date de début</label>
            <input
              id="startDate"
              v-model="session.startDate"
              type="date"
              class="mt-2 px-4 py-2 w-full bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-600">Date de fin</label>
            <input
              id="endDate"
              v-model="session.endDate"
              type="date"
              class="mt-2 px-4 py-2 w-full bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            id="description"
            v-model="session.description"
            rows="4"
            placeholder="Détails sur la session..."
            class="mt-2 px-4 py-2 w-full bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Boutons de soumission -->
        <div class="flex justify-between">
          <button
            type="submit"
            class="px-6 py-2 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Enregistrer la session
          </button>
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2 bg-gray-500 text-white font-medium rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Réinitialiser
          </button>
        </div>
      </form>
      
      <!-- Affichage des sessions existantes -->
      <div v-if="sessions.length" class="mt-8">
        <h3 class="text-xl font-semibold text-gray-700">Sessions d'Inscription</h3>
        <div class="mt-4 space-y-4">
          <div v-for="(session, index) in sessions" :key="index" class="p-4 border border-gray-200 rounded-lg shadow-sm">
            <div class="flex justify-between items-center">
              <h4 class="text-lg font-medium text-gray-800">{{ session.sessionName }}</h4>
              <span v-if="session.active" class="text-sm text-green-600">Active</span>
              <span v-else class="text-sm text-red-600">Inactive</span>
            </div>
            <p class="text-sm text-gray-600 mt-2">Du {{ session.startDate }} au {{ session.endDate }}</p>
            <p class="text-sm text-gray-600 mt-2">{{ session.description }}</p>
            <div class="mt-4 flex justify-end">
              <button
                @click="editSession(index)"
                class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Modifier
              </button>
              <button
                @click="deleteSession(index)"
                class="ml-2 px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message si aucune session n'est disponible -->
      <div v-else class="mt-6 text-center text-gray-500">
        <p>Aucune session d'enregistrement définie pour le moment.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      session: {
        sessionName: '',
        startDate: '',
        endDate: '',
        active: true, // La session est active par défaut
        description: ''
      },
      sessions: [] // Liste des sessions existantes
    };
  },
  methods: {
    saveSession() {
      if (this.session.sessionName && this.session.startDate && this.session.endDate) {
        // Ajouter la session à la liste
        this.sessions.push({ ...this.session });
        // Réinitialiser le formulaire
        this.resetForm();
      }
    },
    resetForm() {
      this.session = {
        sessionName: '',
        startDate: '',
        endDate: '',
        active: true, // Réinitialise l'état actif à true
        description: ''
      };
    },
    editSession(index) {
      // Charger les données de la session pour l'édition
      this.session = { ...this.sessions[index] };
      this.sessions.splice(index, 1);
    },
    deleteSession(index) {
      // Supprimer la session de la liste
      this.sessions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Vous pouvez ajouter des styles supplémentaires si nécessaire */
</style>
