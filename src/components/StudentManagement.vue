<template>
  <div class="container mx-auto p-6 bg-gray-100 space-y-8">
    <!-- Titre principal -->
    <h2 class="text-4xl font-semibold text-gray-800 mb-6">Gestion des Étudiants</h2>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un étudiant par ID ou nom"
        class="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <!-- Tableau principal -->
    <section v-if="filteredStudents.length" class="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h3 class="text-2xl font-semibold text-gray-800">Liste des Étudiants</h3>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">ID de l'Étudiant</th>
            <th class="py-2 px-4 border-b">Nom</th>
            <th class="py-2 px-4 border-b">Classe</th>
            <th class="py-2 px-4 border-b">Statut</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in paginatedStudents" :key="student.id" class="border-b">
            <td class="py-2 px-4">{{ student.studentId }}</td>
            <!-- Champ éditable pour le nom -->
            <td class="py-2 px-4">
              <input
                v-model="student.name"
                type="text"
                class="border rounded px-2 py-1 w-full"
                @blur="saveStudent(student)"
              />
            </td>
            <!-- Champ éditable pour la classe -->
            <td class="py-2 px-4">
              <input
                v-model="student.class"
                type="text"
                class="border rounded px-2 py-1 w-full"
                @blur="saveStudent(student)"
              />
            </td>
            <td class="py-2 px-4" :class="statusClass(student.status)">{{ student.status }}</td>
            <td class="py-2 px-4">
              <button
                v-if="student.status === 'En attente'"
                @click="approveRequest(student.id)"
                class="text-green-600 hover:text-green-800"
              >
                Approuver
              </button>
              <button
                v-if="student.status === 'En attente'"
                @click="denyRequest(student.id)"
                class="ml-4 text-red-600 hover:text-red-800"
              >
                Refuser
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-center space-x-2 mt-4">
        <button 
          @click="prevStudentPage" 
          :disabled="currentStudentPage === 1" 
          class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Précédent
        </button>
        <span class="text-lg font-semibold">Page {{ currentStudentPage }} sur {{ totalStudentPages }}</span>
        <button 
          @click="nextStudentPage" 
          :disabled="currentStudentPage === totalStudentPages" 
          class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Suivant
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      students: [
        { id: 1, studentId: 'S001', name: 'Oumar Ndiaye', class: 'Terminale S1', status: 'En attente' },
        { id: 2, studentId: 'S002', name: 'Aissatou Ba', class: 'Première L2', status: 'Approuvé' },
        { id: 3, studentId: 'S003', name: 'Mamadou Diop', class: 'Seconde C', status: 'En attente' },
        { id: 4, studentId: 'S004', name: 'Fatou Ndiaye', class: 'Terminale L', status: 'Approuvé' },
        // Ajoutez d'autres étudiants si nécessaire...
      ],
      studentsPerPage: 5,
      currentStudentPage: 1,
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedStudents() {
      const start = (this.currentStudentPage - 1) * this.studentsPerPage;
      return this.filteredStudents.slice(start, start + this.studentsPerPage);
    },
    totalStudentPages() {
      return Math.ceil(this.filteredStudents.length / this.studentsPerPage);
    },
  },
  methods: {
    approveRequest(id) {
      const student = this.students.find(s => s.id === id);
      if (student) {
        student.status = 'Approuvé';
      }
    },
    denyRequest(id) {
      const student = this.students.find(s => s.id === id);
      if (student) {
        student.status = 'Refusé';
      }
    },
    prevStudentPage() {
      if (this.currentStudentPage > 1) {
        this.currentStudentPage--;
      }
    },
    nextStudentPage() {
      if (this.currentStudentPage < this.totalStudentPages) {
        this.currentStudentPage++;
      }
    },
    saveStudent(student) {
      console.log('Étudiant sauvegardé :', student);
      // Si vous avez une API, utilisez un appel PUT pour sauvegarder
      // Exemple :
      // fetch(`/api/students/${student.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(student),
      // })
      //   .then(response => response.json())
      //   .then(data => console.log('Modifications enregistrées', data))
      //   .catch(error => console.error('Erreur:', error));
    },
    statusClass(status) {
      switch (status) {
        case 'Approuvé':
          return 'text-green-500';
        case 'Refusé':
          return 'text-red-500';
        default:
          return 'text-yellow-500';
      }
    },
  },
};
</script>

<style scoped>
/* Styles supplémentaires */
button:disabled {
  opacity: 0.5;
}
</style>
