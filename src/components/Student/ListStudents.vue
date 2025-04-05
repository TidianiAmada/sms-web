<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Liste des Élèves</h1>

    <!-- Barre de recherche et filtre par classe -->
    <div class="flex items-center justify-between mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher un élève..."
        class="border rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500"
      />

      <!-- Filtre par classe -->
      <select
        v-model="selectedClass"
        class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les classes</option>
        <option value="Classe A">Classe A</option>
        <option value="Classe B">Classe B</option>
        <option value="Classe C">Classe C</option>
      </select>
    </div>

    <!-- Tableau -->
    <table class="min-w-full border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-blue-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Nom</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Classe</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="eleve in paginatedEleves"
          :key="eleve.id"
          class="hover:bg-gray-50"
        >
          <td class="border border-gray-300 px-4 py-2">{{ eleve.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ eleve.nom }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ eleve.classe }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <router-link
             
              class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Détails
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-600">
        Page {{ currentPage }} sur {{ totalPages }} ({{ filteredEleves.length }} résultats)
      </span>
      <div class="flex space-x-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eleves: [
        { id: 1, nom: 'Aissatou Diop', classe: 'Classe A' },
        { id: 2, nom: 'Moussa Ba', classe: 'Classe B' },
        { id: 3, nom: 'Mariama Ndiaye', classe: 'Classe C' },
        { id: 4, nom: 'Oumar Diouf', classe: 'Classe A' },
        { id: 5, nom: 'Fatou Ndiaye', classe: 'Classe B' },
        { id: 6, nom: 'Ibrahime Sow', classe: 'Classe C' },
      ],
      searchTerm: '',
      selectedClass: '',
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    filteredEleves() {
      let filtered = this.eleves.filter((eleve) => {
        return eleve.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      // Filtrage par classe
      if (this.selectedClass) {
        filtered = filtered.filter((eleve) => eleve.classe === this.selectedClass);
      }
      return filtered;
    },
    paginatedEleves() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEleves.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredEleves.length / this.itemsPerPage);
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>

<style scoped>
table {
  border-radius: 8px;
  overflow: hidden;
}

button:disabled {
  cursor: not-allowed;
}
</style>
