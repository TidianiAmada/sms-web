<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Détails de la Classe</h1>
    
    <div v-if="classDetails">
      <p><strong>Nom de la classe:</strong> {{ classDetails.nom }}</p>
      <p><strong>Niveau:</strong> {{ classDetails.niveau }}</p>
      <router-link :to="{ name: 'ClassesList' }" class="text-blue-500 hover:underline">Retour à la liste des classes</router-link>
    </div>
    <div v-else>
      <p>Classe non trouvée.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classDetails: null,
    };
  },
  created() {
    const classId = this.$route.params.id;
    this.fetchClassDetails(classId);
  },
  methods: {
    fetchClassDetails(id) {
      const classes = [
        { id: 1, nom: 'Classe A', niveau: 'Élémentaire' },
        { id: 2, nom: 'Classe B', niveau: 'Collège' },
        { id: 3, nom: 'Classe C', niveau: 'Lycée' },
      ];
      this.classDetails = classes.find((cls) => cls.id === parseInt(id));
    },
  },
};
</script>
