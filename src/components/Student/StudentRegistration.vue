<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Compléter votre Inscription</h2>

      <!-- Formulaire d'inscription -->
      <form @submit.prevent="completeRegistration">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <!-- Cycle -->
          <div class="col-span-1">
            <label for="cycle" class="block text-sm font-medium text-gray-600">Cycle</label>
            <select 
              id="cycle" 
              v-model="form.cycle"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="updateLevels"
              required
            >
              <option value="">Sélectionnez un cycle</option>
              <option value="Primaire">Primaire</option>
              <option value="Collège">Collège</option>
              <option value="Lycée">Lycée</option>
            </select>
          </div>

          <!-- Niveau -->
          <div v-if="availableLevels.length" class="col-span-1">
            <label for="level" class="block text-sm font-medium text-gray-600">Niveau</label>
            <select 
              id="level" 
              v-model="form.level"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez un niveau</option>
              <option v-for="level in availableLevels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </div>

          <!-- Nom complet -->
          <div class="col-span-1">
            <label for="fullName" class="block text-sm font-medium text-gray-600">Nom complet</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="form.fullName"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Adresse email -->
          <div class="col-span-1">
            <label for="email" class="block text-sm font-medium text-gray-600">Adresse email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Numéro de téléphone -->
          <div class="col-span-1">
            <label for="phone" class="block text-sm font-medium text-gray-600">Numéro de téléphone</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Adresse -->
          <div class="col-span-1 sm:col-span-2">
            <label for="address" class="block text-sm font-medium text-gray-600">Adresse</label>
            <input 
              type="text" 
              id="address" 
              v-model="form.address"
              class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <!-- Bouton de soumission -->
        <div class="mt-6 flex justify-end">
          <button 
            type="submit" 
            class="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700">
            Finaliser l'Inscription
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
      form: {
        cycle: "Collège", // Cycle déjà rempli
        level: "5ème", // Niveau déjà rempli
        fullName: "Bineta Dieng", // Nom complet déjà rempli
        email: "bineta.dieng@gmail.com", // Email déjà rempli
        phone: "+221 77 123 45 67", // Téléphone déjà rempli
        address: "123 Avenue de la République, Dakar", // Adresse déjà remplie
      },
      levels: {
        Primaire: ["CI", "CP", "CE1", "CE2", "CM1", "CM2"],
        Collège: ["6ème", "5ème", "4ème", "3ème"],
        Lycée: ["2nde", "1ère", "Terminale"],
      },
      availableLevels: ["6ème", "5ème", "4ème", "3ème"], // Correspond au cycle sélectionné
    };
  },
  methods: {
    updateLevels() {
      // Met à jour les niveaux en fonction du cycle sélectionné
      this.availableLevels = this.form.cycle ? this.levels[this.form.cycle] : [];
      this.form.level = ""; // Réinitialise le niveau
    },
    completeRegistration() {
      console.log("Inscription complétée avec les informations suivantes : ", this.form);
      // Logique pour envoyer les données au backend
      this.$router.push("/student/dashboard");
    },
  },
};
</script>

<style scoped>
/* Style personnalisé si nécessaire */
</style>
