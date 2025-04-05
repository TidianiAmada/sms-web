<template>
  <div class="container mx-auto p-6">
    <!-- Formulaire pour créer ou éditer des frais de scolarité par classe -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ isEditMode ? 'Modifier les Frais de Scolarité' : 'Définir les Frais de Scolarité par Classe' }}</h3>
      <form @submit.prevent="isEditMode ? updateTuitionFees() : createTuitionFees()" class="space-y-4">
        
        <!-- Tableau dynamique pour ajouter les frais par classe -->
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 border border-gray-300 text-left">Classe</th>
              <th class="p-2 border border-gray-300 text-left">Coût annuel (CFA)</th>
              <th class="p-2 border border-gray-300 text-left">Frais d'inscription (CFA)</th>
              <th class="p-2 border border-gray-300 text-left">Mensualité (CFA)</th>
              <th class="p-2 border border-gray-300 text-left">Cantine (CFA)</th>
              <th class="p-2 border border-gray-300 text-left">Transport (CFA)</th>
              <th class="p-2 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fee, index) in form.fees" :key="index">
              <td>
                <input
                  v-model="fee.level"
                  type="text"
                  class="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Classe"
                  :disabled="isEditMode && currentEditIndex !== index" 
                  required
                />
              </td>
              <td>
                <input
                  v-model="fee.annualCost"
                  type="number"
                  step="0.01"
                  class="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Coût annuel"
                  :disabled="isEditMode && currentEditIndex !== index"
                  required
                />
              </td>
              <td>
                <input
                  v-model="fee.registrationFee"
                  type="number"
                  step="0.01"
                  class="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Frais d'inscription"
                  :disabled="isEditMode && currentEditIndex !== index"
                  required
                />
              </td>
              <td>
                <input
                  v-model="fee.monthlyFee"
                  type="number"
                  step="0.01"
                  class="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Mensualité"
                  :disabled="isEditMode && currentEditIndex !== index"
                  required
                />
              </td>
              <td>
                <input
                  v-model="fee.cafeteriaFee"
                  type="number"
                  step="0.01"
                  class="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Cantine (optionnel)"
                  :disabled="isEditMode && currentEditIndex !== index"
                />
              </td>
              <td>
                <input
                  v-model="fee.transportationFee"
                  type="number"
                  step="0.01"
                  class="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Transport (optionnel)"
                  :disabled="isEditMode && currentEditIndex !== index"
                />
              </td>
              <td class="flex items-center space-x-2">
                <button @click.prevent="removeFee(index)" class="text-red-500 hover:text-red-700 font-semibold">
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Bouton pour ajouter une nouvelle ligne -->
        <div class="mt-4">
          <button @click.prevent="addFee" class="px-4 py-2 bg-teal-600 text-white font-medium rounded-md shadow-md hover:bg-teal-700">
            Ajouter une Classe
          </button>
        </div>

        <!-- Bouton de soumission -->
        <div class="mt-6 flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700"
          >
            {{ isEditMode ? 'Mettre à jour' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Affichage de la liste des frais par classe sous forme de tableau -->
    <div v-if="tuitionFees.length" class="mt-8">
      <h3 class="text-xl font-semibold text-gray-700">Liste des Frais de Scolarité par Classe</h3>
      <table class="w-full mt-4 border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border border-gray-300 text-left">Classe</th>
            <th class="p-2 border border-gray-300 text-left">Coût annuel (CFA)</th>
            <th class="p-2 border border-gray-300 text-left">Frais d'inscription (CFA)</th>
            <th class="p-2 border border-gray-300 text-left">Mensualité (CFA)</th>
            <th class="p-2 border border-gray-300 text-left">Cantine (CFA)</th>
            <th class="p-2 border border-gray-300 text-left">Transport (CFA)</th>
            <th class="p-2 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fee, index) in tuitionFees" :key="index">
            <td class="p-2 border border-gray-300">{{ fee.level }}</td>
            <td class="p-2 border border-gray-300">{{ fee.annualCost }} CFA</td>
            <td class="p-2 border border-gray-300">{{ fee.registrationFee }} CFA</td>
            <td class="p-2 border border-gray-300">{{ fee.monthlyFee }} CFA</td>
            <td class="p-2 border border-gray-300" v-if="fee.cafeteriaFee">{{ fee.cafeteriaFee }} CFA</td>
            <td class="p-2 border border-gray-300" v-if="fee.transportationFee">{{ fee.transportationFee }} CFA</td>
            <td class="flex items-center space-x-2">
              <button @click.prevent="editFee(index)" class="text-yellow-500 hover:text-yellow-700 font-semibold">
                Modifier
              </button>
              <button @click.prevent="removeFee(index)" class="text-red-500 hover:text-red-700 font-semibold">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucune entrée n'est définie -->
    <div v-else class="mt-6 text-center text-gray-500">
      <p>Aucun frais de scolarité défini pour le moment.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditMode: false,
      currentEditIndex: null, // Indice de la ligne en cours de modification
      form: {
        fees: [
          { level: '', annualCost: '', registrationFee: '', monthlyFee: '', cafeteriaFee: '', transportationFee: '' }
        ]
      },
      tuitionFees: [] // Liste des frais de scolarité
    };
  },
  methods: {
    addFee() {
      // Ajouter un nouvel objet fee à la liste
      this.form.fees.push({
        level: '',
        annualCost: '',
        registrationFee: '',
        monthlyFee: '',
        cafeteriaFee: '',
        transportationFee: ''
      });
    },
    removeFee(index) {
      // Supprimer un frais de scolarité de la liste
      this.tuitionFees.splice(index, 1);
    },
    editFee(index) {
      // Remplir le formulaire avec les valeurs de la ligne à modifier
      this.isEditMode = true;
      this.currentEditIndex = index;
      this.form.fees = [{ ...this.tuitionFees[index] }];
    },
    updateTuitionFees() {
      // Mettre à jour la ligne sélectionnée dans tuitionFees
      this.$set(this.tuitionFees, this.currentEditIndex, this.form.fees[0]);
      this.resetForm();
    },
    createTuitionFees() {
      // Ajouter de nouvelles lignes dans tuitionFees
      this.tuitionFees.push(...this.form.fees);
      this.resetForm();
    },
    resetForm() {
      this.form.fees = [
        { level: '', annualCost: '', registrationFee: '', monthlyFee: '', cafeteriaFee: '', transportationFee: '' }
      ];
      this.isEditMode = false;
      this.currentEditIndex = null;
    }
  }
};
</script>
