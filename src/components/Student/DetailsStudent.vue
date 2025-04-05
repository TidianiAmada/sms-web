<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Détails de l'Élève</h1>
    
    <div v-if="student">
      <p><strong>Nom:</strong> {{ student.nom }}</p>
      <p><strong>Classe:</strong> {{ student.classe }}</p>
    
    </div>
    <div v-else>
      <p>Élève non trouvé.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: null,
    };
  },
  created() {
    const studentId = this.$route.params.id;
    this.fetchStudentDetails(studentId);
  },
  methods: {
    fetchStudentDetails(id) {
      const students = [
        { id: 1, nom: 'Aissatou Diop', classe: 'Classe A' },
        { id: 2, nom: 'Moussa Ba', classe: 'Classe B' },
        { id: 3, nom: 'Mariama Ndiaye', classe: 'Classe C' },
      ];
      this.student = students.find((student) => student.id === parseInt(id));
    },
  },
};
</script>
