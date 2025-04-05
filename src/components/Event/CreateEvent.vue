<template>
  <div>
    <FullCalendar :options="calendarOptions" />

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2 class="text-2xl font-bold mb-4">Créer un événement</h2>
        <form @submit.prevent="saveEvent" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Nom de l'événement -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Nom de l'événement</label>
            <input 
              v-model="newEvent.title" 
              placeholder="Nom de l'événement" 
              class="p-2 border rounded mt-2"
              type="text"
            />
          </div>

          <!-- Type d'événement -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Type d'événement</label>
            <select 
              v-model="newEvent.type" 
              class="p-2 border rounded mt-2"
            >
              <option value="cours">Cours</option>
              <option value="vacances">Vacances</option>
              <option value="examen">Examen</option>
            </select>
          </div>

          <!-- Jours de la semaine -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Jours de la semaine</label>
            <select 
              v-model="newEvent.daysOfWeek" 
              multiple
              class="p-2 border rounded mt-2"
            >
              <option value="MO">Lundi</option>
              <option value="TU">Mardi</option>
              <option value="WE">Mercredi</option>
              <option value="TH">Jeudi</option>
              <option value="FR">Vendredi</option>
              <option value="SA">Samedi</option>
              <option value="SU">Dimanche</option>
            </select>
          </div>

          <!-- Heure de début -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Heure de début</label>
            <input 
              v-model="newEvent.startTime" 
              type="time" 
              class="p-2 border rounded mt-2"
            />
          </div>

          <!-- Heure de fin -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Heure de fin</label>
            <input 
              v-model="newEvent.endTime" 
              type="time" 
              class="p-2 border rounded mt-2"
            />
          </div>

          <!-- Date de début de récurrence -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Date de début de récurrence</label>
            <input 
              v-model="newEvent.startRecur" 
              type="date" 
              class="p-2 border rounded mt-2"
            />
          </div>

          <!-- Date de fin de récurrence -->
          <div class="flex flex-col">
            <label class="font-medium text-sm">Date de fin de récurrence</label>
            <input 
              v-model="newEvent.endRecur" 
              type="date" 
              class="p-2 border rounded mt-2"
            />
          </div>

          <div class="flex justify-end mt-4 gap-4">
            <button @click="closeModal" class="p-2 bg-gray-300 rounded hover:bg-gray-400">
              Annuler
            </button>
            <button @click="saveEvent" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from '@fullcalendar/rrule' // Importer le plugin RRule
import { RRule } from 'rrule'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      showModal: false,
      newEvent: {
        title: '',
        type: 'cours',
        startTime: '09:00', // Heure de début par défaut
        endTime: '10:00', // Heure de fin par défaut
        daysOfWeek: ['MO', 'TU'], // Jours de la semaine par défaut
        startRecur: '',
        endRecur: ''
      },
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, rrulePlugin], // Ajouter rrulePlugin
        initialView: 'timeGridWeek',
        events: [
          // Événements par défaut
          {
            title: 'Mathématiques - Cours',
            start: '2024-12-05T09:00:00',
            end: '2024-12-05T10:00:00',
            description: 'Cours de mathématiques',
            backgroundColor: 'blue',
            textColor: 'white'
          },
          {
            title: 'Physique - Cours',
            start: '2024-12-06T10:00:00',
            end: '2024-12-06T11:00:00',
            description: 'Cours de physique',
            backgroundColor: 'green',
            textColor: 'white'
          },
          {
            title: 'Vacances d\'hiver',
            start: '2024-12-20T00:00:00',
            end: '2024-12-31T23:59:59',
            description: 'Vacances scolaires d\'hiver',
            backgroundColor: 'red',
            textColor: 'white'
          }
        ],
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick
      }
    };
  },
  methods: {
    handleDateClick(arg) {
      this.newEvent.startRecur = arg.dateStr; // Initialisation de la date de début
      this.newEvent.endRecur = arg.dateStr; // Initialisation de la date de fin
      this.showModal = true;
    },
    handleEventClick(info) {
      alert(`Événement: ${info.event.title}`);
    },
    saveEvent() {
      if (this.newEvent.title && this.newEvent.startRecur && this.newEvent.endRecur) {
        const rrule = this.generateRRule();

        // Vérification des valeurs avant d'ajouter à l'événement
        console.log("Titre de l'événement:", this.newEvent.title);
        console.log("Heure de début:", this.newEvent.startRecur + 'T' + this.newEvent.startTime);
        console.log("Heure de fin:", this.newEvent.startRecur + 'T' + this.newEvent.endTime);

        const event = {
          title: this.newEvent.title,
          start: this.newEvent.startRecur + 'T' + this.newEvent.startTime, // Date de début
          end: this.newEvent.startRecur + 'T' + this.newEvent.endTime,     // Date de fin
          rrule: rrule.toString(),
          description: this.newEvent.type,
          backgroundColor: this.getEventColor(this.newEvent.type),
          textColor: 'white'
        };

        // Ajouter l'événement au calendrier
        this.calendarOptions.events.push(event);
        this.closeModal();
      } else {
        console.error("Les champs nécessaires sont manquants.");
      }
    },

    closeModal() {
      this.showModal = false;
    },

    getEventColor(type) {
      switch (type) {
        case 'cours':
          return 'blue';
        case 'vacances':
          return 'green';
        case 'examen':
          return 'red';
        default:
          return 'gray';
      }
    },

    generateRRule() {
      // Créer une règle RRULE à partir des jours et des dates de récurrence
      const startDate = new Date(this.newEvent.startRecur + 'T' + this.newEvent.startTime); // Créer un objet Date pour dtstart
      const endDate = new Date(this.newEvent.endRecur + 'T' + this.newEvent.endTime); // Créer un objet Date pour until

      // Assurez-vous que le tableau des jours est correctement mappé
      const rule = new RRule({
        freq: RRule.WEEKLY,
        byweekday: this.newEvent.daysOfWeek.map(day => RRule[day]),
        dtstart: startDate, // Utilisez l'objet Date ici
        until: endDate // Utilisez l'objet Date ici
      });
      
      return rule;
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

button {
  margin-top: 10px;
}
</style>
