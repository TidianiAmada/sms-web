<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Liste des Professeurs</h1>

    <!-- Barre de recherche et filtre -->
    <div class="flex items-center justify-between mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher un professeur..."
        class="border rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="selectedMatiere"
        class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les matières</option>
        <option v-for="matiere in matieres" :key="matiere" :value="matiere">
          {{ matiere }}
        </option>
      </select>
    </div>

    <!-- Tableau -->
    <table class="min-w-full border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-blue-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Nom</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Matière</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prof in paginatedProfesseurs"
          :key="prof.id"
          class="hover:bg-gray-50"
        >
          <td class="border border-gray-300 px-4 py-2">{{ prof.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ prof.nom }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ prof.matiere }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">
             <router-link
              :to="{ name: 'details-teacher', params: { id: prof.id } }"
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
        Page {{ currentPage }} sur {{ totalPages }} ({{ filteredProfesseurs.length }} résultats)
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
      professeurs: [
        { id: 1, nom: 'Mme. Ndiaye', matiere: 'Mathématiques' },
        { id: 2, nom: 'M. Diop', matiere: 'Français' },
        { id: 3, nom: 'Mme. Ba', matiere: 'Histoire-Géographie' },
        { id: 4, nom: 'M. Faye', matiere: 'Physique' },
        { id: 5, nom: 'Mme. Fall', matiere: 'Chimie' },
        { id: 6, nom: 'M. Sow', matiere: 'Anglais' },
        { id: 7, nom: 'M. Gaye', matiere: 'Philosophie' },
        { id: 8, nom: 'Mme. Diallo', matiere: 'SVT' },
      ],
      searchTerm: '',
      selectedMatiere: '',
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    filteredProfesseurs() {
      return this.professeurs.filter((prof) => {
        const matchesSearch = prof.nom
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
        const matchesMatiere =
          !this.selectedMatiere || prof.matiere === this.selectedMatiere;
        return matchesSearch && matchesMatiere;
      });
    },
    paginatedProfesseurs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProfesseurs.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProfesseurs.length / this.itemsPerPage);
    },
    matieres() {
      return [...new Set(this.professeurs.map((prof) => prof.matiere))];
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
/* Ajout d'effets supplémentaires pour améliorer le tableau */
table {
  border-radius: 8px;
  overflow: hidden;
}

button:disabled {
  cursor: not-allowed;
}
</style>
