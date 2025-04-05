<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Liste des Classes</h1>

    <!-- Barre de recherche et filtre par niveau -->
    <div class="flex items-center justify-between mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher une classe..."
        class="border rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500"
      />
      
      <!-- Filtre par niveau -->
      <select
        v-model="selectedLevel"
        class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tous les niveaux</option>
        <option value="Élémentaire">Élémentaire</option>
        <option value="Collège">Collège</option>
        <option value="Lycée">Lycée</option>
      </select>
    </div>

    <!-- Tableau -->
    <table class="min-w-full border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-blue-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Nom</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Niveau</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="classe in paginatedClasses"
          :key="classe.id"
          class="hover:bg-gray-50"
        >
          <td class="border border-gray-300 px-4 py-2">{{ classe.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ classe.nom }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ classe.niveau }}</td>
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
        Page {{ currentPage }} sur {{ totalPages }} ({{ filteredClasses.length }} résultats)
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
      classes: [
        { id: 1, nom: 'Classe A', niveau: 'Élémentaire' },
        { id: 2, nom: 'Classe B', niveau: 'Collège' },
        { id: 3, nom: 'Classe C', niveau: 'Lycée' },
        { id: 4, nom: 'Classe D', niveau: 'Élémentaire' },
        { id: 5, nom: 'Classe E', niveau: 'Collège' },
        { id: 6, nom: 'Classe F', niveau: 'Lycée' },
      ],
      searchTerm: '',
      selectedLevel: '',
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    filteredClasses() {
      let filtered = this.classes.filter((classe) => {
        return classe.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      // Filtrage par niveau
      if (this.selectedLevel) {
        filtered = filtered.filter((classe) => classe.niveau === this.selectedLevel);
      }
      return filtered;
    },
    paginatedClasses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredClasses.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredClasses.length / this.itemsPerPage);
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
