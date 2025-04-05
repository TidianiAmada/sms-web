<template>
  <div class="container mx-auto p-6 bg-gray-50">
    <!-- Titre de la page -->
    <h2 class="text-4xl font-semibold text-gray-800 mb-6">Demandes de Transfert Entrante</h2>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par nom, ID ou école"
        class="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <!-- Tableau des demandes de transfert -->
    <section v-if="filteredTransferRequests.length" class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead class="bg-blue-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 border-b">Nom de l'Étudiant</th>
            <th class="px-4 py-2 border-b">ID Étudiant</th>
            <th class="px-4 py-2 border-b">École d'Origine</th>
            <th class="px-4 py-2 border-b">Administrateur de l'Ancienne École</th>
            <th class="px-4 py-2 border-b">Coordonnées de l'Administrateur</th> <!-- Nouvelle colonne -->
            <th class="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transfer in filteredTransferRequests" :key="transfer.id">
            <td class="px-4 py-2 border-b text-gray-800">{{ transfer.studentName }}</td>
            <td class="px-4 py-2 border-b text-gray-600">{{ transfer.studentId }}</td>
            <td class="px-4 py-2 border-b text-gray-600">{{ transfer.originSchool }}</td>
            <td class="px-4 py-2 border-b text-gray-600">{{ transfer.adminName }}</td>
            <td class="px-4 py-2 border-b text-gray-600">
              <!-- Affichage des coordonnées de l'administrateur -->
              <p>Email: <a :href="'mailto:' + transfer.adminEmail" class="text-blue-600 hover:text-blue-800">{{ transfer.adminEmail }}</a></p>
              <p>Téléphone: <a :href="'tel:' + transfer.adminPhone" class="text-blue-600 hover:text-blue-800">{{ transfer.adminPhone }}</a></p>
            </td>
            <td class="px-4 py-2 border-b">
              <button
                @click="initiateTransfer(transfer.id)"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
          Accepter transfert
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Message quand il n'y a pas de demande de transfert -->
    <section v-else>
      <p class="text-lg text-gray-600">Aucune demande de transfert en attente pour le moment.</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',  // La variable pour stocker la requête de recherche
      transferRequests: [
        {
          id: 1,
          studentId: 'S001',
          studentName: 'Oumar Ndiaye',
          originSchool: 'École Saint-Exupéry',
          adminName: 'Mamadou Faye',
          adminEmail: 'mamadoufaye@ecolesaintexupery.com', // Email de l'administrateur
          adminPhone: '+221 77 123 45 67', // Téléphone de l'administrateur
        },
        {
          id: 2,
          studentId: 'S002',
          studentName: 'Aissatou Ba',
          originSchool: 'École ABC',
          adminName: 'Fatou Sow',
          adminEmail: 'fatousow@ecoleabc.com', // Email de l'administrateur
          adminPhone: '+221 77 987 65 43', // Téléphone de l'administrateur
        },
        // Ajoutez d'autres demandes ici
      ]
    };
  },
  computed: {
    // Filtrer les demandes de transfert en fonction de la recherche
    filteredTransferRequests() {
      return this.transferRequests.filter(transfer => {
        const query = this.searchQuery.toLowerCase();
        return (
          transfer.studentName.toLowerCase().includes(query) ||
          transfer.studentId.toLowerCase().includes(query) ||
          transfer.originSchool.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    initiateTransfer(id) {
      // Code pour initier le transfert de l'étudiant
      console.log(`Demande de transfert initiée pour l'étudiant avec ID: ${id}`);
      // Vous pouvez ici appeler une méthode API ou changer l'état local pour marquer le transfert comme initié.
    }
  }
};
</script>

<style scoped>
/* Améliorations de l'apparence du tableau */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f7fafc;
}

button:disabled {
  opacity: 0.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
