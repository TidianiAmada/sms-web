<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Détails du Professeur</h1>
    
    <div v-if="teacher">
      <p><strong>Nom:</strong> {{ teacher.nom }}</p>
      <p><strong>Matière:</strong> {{ teacher.matiere }}</p>
      
      <!-- Onglet pour assigner un événement -->
      <button @click="showEventForm = !showEventForm" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        {{ showEventForm ? 'Annuler l\'assignation' : 'Assigner un événement' }}
      </button>

      <!-- Formulaire pour assigner un événement -->
      <div v-if="showEventForm" class="mt-6">
        <h3 class="text-xl font-semibold mb-2">Assigner un événement</h3>
        
        <form @submit.prevent="assignEvent">
          <div class="mb-4">
            <label for="eventName" class="block text-sm font-medium text-gray-700">Nom de l'événement</label>
            <input
              id="eventName"
              v-model="newEvent.name"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="eventDate" class="block text-sm font-medium text-gray-700">Date de l'événement</label>
            <input
              id="eventDate"
              v-model="newEvent.date"
              type="date"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            Assigner l'événement
          </button>
        </form>
      </div>
      
      <!-- Affichage des événements assignés -->
      <div v-if="teacher.events && teacher.events.length > 0" class="mt-6">
        <h3 class="text-xl font-semibold mb-2">Événements assignés</h3>
        <ul>
          <li v-for="event in teacher.events" :key="event.id">
            <p><strong>{{ event.name }}</strong> le {{ event.date }}</p>
          </li>
        </ul>
      </div>

    </div>
    
    <div v-else>
      <p>Professeur non trouvé.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacher: null, // Les détails du professeur
      showEventForm: false, // Contrôle l'affichage du formulaire d'événement
      newEvent: { name: '', date: '' }, // Les données du nouvel événement
    };
  },
  created() {
    // Récupérer l'ID du professeur depuis l'URL
    const teacherId = this.$route.params.id;
    this.fetchTeacherDetails(teacherId); // Charger les détails du professeur
  },
  methods: {
    fetchTeacherDetails(id) {
      // Simuler les données des professeurs
      const teachers = [
        { id: 1, nom: 'Mme. Ndiaye', matiere: 'Mathématiques', events: [] },
        { id: 2, nom: 'M. Diop', matiere: 'Français', events: [] },
        { id: 3, nom: 'Mme. Ba', matiere: 'Histoire-Géographie', events: [] },
      ];

      // Chercher le professeur par ID
      if (id) {
        this.teacher = teachers.find((teacher) => teacher.id === parseInt(id));
      }
    },
    assignEvent() {
      // Vérifier si l'événement est valide
      if (this.newEvent.name && this.newEvent.date) {
        // Ajouter l'événement au professeur
        const event = {
          id: Date.now(), // Générer un ID unique pour l'événement
          name: this.newEvent.name,
          date: this.newEvent.date,
        };
        
        this.teacher.events.push(event);
        // Réinitialiser le formulaire
        this.newEvent.name = '';
        this.newEvent.date = '';
        this.showEventForm = false; // Masquer le formulaire après soumission
      }
    },
  },
};
</script>

<style scoped>
/* Ajout de style pour les éléments du formulaire et de la liste d'événements */
</style>
