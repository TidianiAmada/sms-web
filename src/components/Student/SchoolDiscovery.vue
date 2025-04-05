<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Écoles dans votre région</h1>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une école..."
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Grille des cartes d'écoles -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="school in filteredSchools"
        :key="school.id"
        class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
      >
        <!-- Image de l'école -->
        <img
          :src="school.imageUrl"
          alt="Photo de {{ school.name }}"
          class="rounded-md mb-4 object-cover h-40 w-full"
        />

        <!-- Détails de l'école -->
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ school.name }}</h2>
          <p class="flex items-center text-gray-600">
            <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"></path>
            </svg>
            {{ school.location }}
          </p>
        </div>

        <!-- Bouton de demande d'accès -->
        <button
          @click="openPopup(school.id)"
          class="mt-4 py-2 px-4 rounded-lg focus:outline-none"
          :class="{
            'bg-blue-500 text-white hover:bg-blue-600': requestedSchoolId !== school.id,
            'bg-green-500 text-white': requestedSchoolId === school.id
          }"
          :disabled="requestedSchoolId === school.id"
        >
          {{ requestedSchoolId === school.id ? 'Demande envoyée' : "Demander l'accès" }}
        </button>
      </div>
    </div>

    <!-- Message si aucune école trouvée -->
    <div v-if="filteredSchools.length === 0" class="text-gray-600 mt-6">
      Aucune école trouvée pour "{{ searchQuery }}"
    </div>

    <!-- Popup de demande d'accès -->
    <div v-if="isPopupVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Demande d'accès</h3>
        <p class="text-gray-700 mb-4">
          Veuillez préciser votre situation :
        </p>

        <!-- Options -->
        <div class="mb-4">
          <label class="block mb-2">
            <input type="radio" value="ancien" v-model="accessOption" />
            J'ai étudié dans cette école
          </label>
          <label class="block">
            <input type="radio" value="transfert" v-model="accessOption" />
            Demande de transfert
          </label>
        </div>

        <!-- Champs communs (cycle et classe) -->
        <div class="mb-4">
          <label class="block mb-2">Cycle :</label>
          <select v-model="formData.cycle" class="w-full p-2 border rounded">
            <option value="elementaire">Elementaire</option>
            <option value="college">Collège</option>
            <option value="lycée">Lycée</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block mb-2">Classe :</label>
          <input
            v-model="formData.classe"
            type="text"
            placeholder="Exemple : 6ème B"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Champs supplémentaires pour une demande de transfert -->
        <div v-if="accessOption === 'transfert'">
          <!-- École connectée -->
          <div class="mb-4">
            <label class="block mb-2">École d'origine :</label>
            <select v-model="formData.ecoleOrigine" class="w-full p-2 border rounded">
              <option disabled value="">Sélectionnez une école</option>
              <option v-for="ecole in connectedSchools" :key="ecole.id" :value="ecole.name">
                {{ ecole.name }}
              </option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <!-- Champs pour une école non connectée -->
          <div v-if="formData.ecoleOrigine === 'autre'">
            <div class="mb-4">
              <label class="block mb-2">Nom de l'école :</label>
              <input
                v-model="formData.nomEcoleOrigine"
                type="text"
                placeholder="Nom de l'école"
                class="w-full p-2 border rounded"
              />
            </div>
            <div class="mb-4">
              <label class="block mb-2">Contact de l'école :</label>
              <input
                v-model="formData.contactOrigine"
                type="text"
                placeholder="Téléphone ou email"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-4">
          <button @click="closePopup" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Annuler
          </button>
          <button @click="submitRequest" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Soumettre
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default {
  data() {
    return {
      searchQuery: "",
      requestedSchoolId: null,
      isPopupVisible: false,
      accessOption: null,
      formData: {
        cycle: "",
        classe: "",
        ecoleOrigine: "",
        nomEcoleOrigine: "",
        contactOrigine: "",
      },
      schools: [
        { id: 1, name: "École Saint-Louis", location: "Dakar", imageUrl: "https://via.placeholder.com/150?text=École+Saint-Louis" },
        { id: 2, name: "Lycée Blaise Diagne", location: "Dakar", imageUrl: "https://via.placeholder.com/150?text=Lycée+Blaise+Diagne" },
        { id: 3, name: "Collège Sacré-Coeur", location: "Dakar", imageUrl: "https://via.placeholder.com/150?text=Collège+Sacré-Coeur" },
      ],
      connectedSchools: [
        { id: 1, name: "École Saint-Louis" },
        { id: 2, name: "Lycée Blaise Diagne" },
        { id: 3, name: "Collège Sacré-Coeur" },
      ],
    };
  },
  computed: {
    filteredSchools() {
      return this.schools.filter(
        school =>
          school.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          school.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    openPopup(schoolId) {
      this.requestedSchoolId = schoolId;
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    submitRequest() {
      if (this.formData.cycle && this.formData.classe) {
        toastr.success("Votre demande a été soumise avec succès !", "Succès");
        console.log("Option choisie :", this.accessOption);
        console.log("Données du formulaire :", this.formData);
        this.closePopup();
      } else {
        toastr.error("Veuillez remplir tous les champs obligatoires.", "Erreur");
      }
    },
  },
};
</script>


<style>
/* Ajoutez ici vos styles personnalisés */
</style>
