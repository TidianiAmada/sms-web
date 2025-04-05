<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Configuration de l'école</h2>

      <!-- Formulaire de configuration de l'école -->
      <form @submit.prevent="submitSchoolSetup">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <!-- Nom de l'école -->
          <div class="col-span-1">
            <label for="schoolName" class="block text-sm font-medium text-gray-600">Nom de l'école</label>
            <input 
              type="text" 
              id="schoolName" 
              v-model="school.name"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Adresse de l'école -->
          <div class="col-span-1">
            <label for="schoolAddress" class="block text-sm font-medium text-gray-600">Adresse</label>
            <input 
              type="text" 
              id="schoolAddress" 
              v-model="school.address"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Numéro de téléphone de l'école -->
          <div class="col-span-1">
            <label for="schoolTelephone" class="block text-sm font-medium text-gray-600">Numéro de téléphone</label>
            <input 
              type="tel" 
              id="schoolTelephone" 
              v-model="school.telephone"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Pays -->
          <div class="col-span-1">
            <label for="schoolCountry" class="block text-sm font-medium text-gray-600">Pays</label>
            <select 
              id="schoolCountry" 
              v-model="school.country"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un pays</option>
              <option value="Sénégal">Sénégal</option>
              <option value="France">France</option>
              <option value="Côte d'Ivoire">Côte d'Ivoire</option>
              <option value="Maroc">Maroc</option>
              <!-- Ajoutez d'autres pays si nécessaire -->
            </select>
          </div>

          <!-- Description de l'école -->
          <div class="col-span-1 sm:col-span-2">
            <label for="schoolDescription" class="block text-sm font-medium text-gray-600">Description de l'école</label>
            <textarea 
              id="schoolDescription" 
              v-model="school.description"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Fournir une description de l'école, y compris les informations de contact"
              required
            ></textarea>
          </div>

          <!-- Sélectionner les cycles (un ou plusieurs) -->
          <div class="col-span-1 sm:col-span-2">
            <label for="otherCycles" class="block text-sm font-medium text-gray-600">Cycles</label>
            <div class="flex flex-wrap gap-4">
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="school.cycles" value="primaire" class="h-4 w-4">
                <span class="text-sm">ELEMENTAIRE</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="school.cycles" value="secondaire" class="h-4 w-4">
                <span class="text-sm">COLLEGE</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="school.cycles" value="universitaire" class="h-4 w-4">
                <span class="text-sm">LYCEE</span>
              </label>
            </div>
          </div>
          
        </div>

        <!-- Bouton de soumission -->
        <div class="mt-6 flex justify-end">
          <button 
            type="submit" 
            class="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700">
            Sauvegarder les informations
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      school: {
        id: null,               // ID de l'école
        name: '',               // Nom de l'école
        address: '',            // Adresse de l'école
        telephone: '',          // Téléphone de l'école
        country: '',            // Pays de l'école
        description: '',        // Description de l'école
        cycles: []              // Cycles sélectionnés (tableau pour plusieurs valeurs)
      }
    };
  },
  methods: {
    submitSchoolSetup() {
      // Logic to handle form submission and save school information
      console.log('Information de l\'école sauvegardée:', this.school);
      // Exemple de soumission d'un formulaire, vous pouvez l'envoyer à une API ou à une base de données
    }
  }
};
</script>

<style scoped>
/* Style personnalisé si nécessaire */
</style>
