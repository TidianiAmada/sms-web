<template>
  <div class="container mx-auto p-6 bg-gray-50">
    <div class="bg-white shadow-lg rounded-xl p-6 space-y-8">
      <h2 class="text-4xl font-semibold text-gray-900 mb-6">Gestion de la Structure de l'École</h2>

      <!-- Onglets pour la navigation entre les cycles -->
      <div class="flex justify-center space-x-8 mb-6">
        <button 
          @click="selectedCycle = 'elementaire'" 
          :class="{'text-blue-500': selectedCycle === 'elementaire'}"
          class="px-6 py-3 text-lg font-medium hover:text-blue-600 focus:outline-none">
          Élémentaire
        </button>
        <button 
          @click="selectedCycle = 'college'" 
          :class="{'text-blue-500': selectedCycle === 'college'}"
          class="px-6 py-3 text-lg font-medium hover:text-blue-600 focus:outline-none">
          Collège
        </button>
        <button 
          @click="selectedCycle = 'lycee'" 
          :class="{'text-blue-500': selectedCycle === 'lycee'}"
          class="px-6 py-3 text-lg font-medium hover:text-blue-600 focus:outline-none">
          Lycée
        </button>
      </div>

      <!-- Formulaire de configuration selon le cycle sélectionné -->
      <div v-if="selectedCycle" class="space-y-6">
        <div class="space-y-4" v-for="(cycleData, cycleName) in schoolStructure" :key="cycleName" v-show="selectedCycle === cycleName">
          <h3 class="text-3xl font-semibold text-gray-800">{{
            cycleName.charAt(0).toUpperCase() + cycleName.slice(1)
          }}</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div v-for="(level, index) in cycleData.levels" :key="index" class="bg-white shadow-md rounded-lg p-6 space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-xl font-medium text-gray-700">{{ level.name }}</span>
                <button @click="removeLevel(cycleName, index)" class="text-red-600 hover:text-red-800">
                  Supprimer
                </button>
              </div>

              <div class="space-y-4">
                <div v-for="(classItem, classIndex) in level.classes" :key="classIndex" class="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                  <span>{{ classItem }}</span>
                  <div class="flex space-x-4">
                    <button @click="editClass(level, classIndex)" class="text-blue-500 hover:text-blue-700">
                      Modifier
                    </button>
                    <button @click="removeClass(level.classes, classIndex)" class="text-red-500 hover:text-red-700">
                      Supprimer
                    </button>
                  </div>
                </div>

                <div v-if="editClassIndex === index" class="space-y-4 mt-4">
                  <input 
                    v-model="editClassName" 
                    type="text" 
                    class="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
                    placeholder="Nom de la classe"
                  />
                  <div class="flex justify-end space-x-4">
                    <button 
                      @click="saveClassEdit(level, index)" 
                      class="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg">
                      Sauvegarder
                    </button>
                    <button 
                      @click="cancelEdit"
                      class="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg">
                      Annuler
                    </button>
                  </div>
                </div>

                <!-- Ajouter une classe -->
                <button 
                  @click.prevent="addClass(level.classes)" 
                  class="mt-4 text-lg text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  + Ajouter une classe
                </button>
              </div>
            </div>
          </div>

          <!-- Ajouter un niveau -->
          <button 
            @click.prevent="addLevel(cycleName)" 
            class="mt-6 text-lg text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
            + Ajouter un niveau
          </button>
        </div>
      </div>

      <!-- Bouton de soumission -->
      <div class="mt-8 flex justify-end">
        <button 
          @click="submitSchoolStructure" 
          class="px-6 py-3 text-lg text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
          Sauvegarder
        </button>
      </div>
    </div>

    <!-- Barre de progression (optionnelle) -->
    <div v-if="isSaving" class="fixed bottom-0 left-0 w-full bg-blue-500 text-white p-2 text-center">
      Sauvegarde en cours...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCycle: 'elementaire', // Cycle actuellement sélectionné
      schoolStructure: {
        elementaire: {
          levels: [
            { name: 'CI', classes: ['Classe A' ] },
            { name: 'CP', classes: ['Classe A'] },
            { name: 'CE1', classes: ['Classe A'] },
             { name: 'CE2', classes: ['Classe A'] },
              { name: 'CM1', classes: ['Classe A'] },
                { name: 'CM2', classes: ['Classe A'] }
          ]
        },
        college: {
          levels: [
            { name: '6ème', classes: ['Classe A'] },
            { name: '5ème', classes: ['Classe A'] },
                   { name: '4ème', classes: ['Classe A'] },
                          { name: '3ème', classes: ['Classe A'] }
          ]
        },
        lycee: {
          levels: [
            { name: '2nde', classes: ['Classe A'] },
            { name: '1ère', classes: ['Classe B'] },
            { name: 'Tmnale', classes: ['Classe B'] }
          ]
        }
      },
      editClassIndex: null,
      editClassName: '',
      isSaving: false
    };
  },
  methods: {
    addLevel(cycleName) {
      const newLevelName = prompt('Entrez le nom du niveau');
      if (newLevelName) {
        this.schoolStructure[cycleName].levels.push({ name: newLevelName, classes: ['Classe A'] });
      }
    },
    removeLevel(cycleName, index) {
      this.schoolStructure[cycleName].levels.splice(index, 1);
    },
    addClass(classes) {
      classes.push('Nouvelle Classe');
    },
    removeClass(classes, index) {
      classes.splice(index, 1);
    },
    editClass(level, index) {
      this.editClassName = level.classes[index];
      this.editClassIndex = index;
    },
    saveClassEdit(level, index) {
      level.classes[index] = this.editClassName;
      this.editClassIndex = null;
      this.editClassName = '';
    },
    cancelEdit() {
      this.editClassIndex = null;
      this.editClassName = '';
    },
    submitSchoolStructure() {
      this.isSaving = true;
      setTimeout(() => {
        console.log('Structure de l\'école sauvegardée:', this.schoolStructure);
        this.isSaving = false;
      }, 2000);
    }
  }
};
</script>

<style scoped>
  /* Ajout de styles pour des transitions subtiles */
  .btn {
    transition: all 0.3s ease;
  }
  .btn:hover {
    transform: translateY(-2px);
  }
</style>
