<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Reçu de Paiement</h2>

      <p class="text-lg">Méthode de paiement: {{ paymentMethod }}</p>
      <p class="text-gray-600">Montant payé: 1000 FCFA</p>
      <p class="text-gray-600">Date du paiement: {{ paymentDate }}</p>

      <div class="mt-4">
        <button 
          @click="downloadReceipt"
          class="px-6 py-2 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700"
        >
          Télécharger le Reçu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentMethod: this.$route.params.method, // Récupérer la méthode de paiement passée via la route
      paymentDate: new Date().toLocaleDateString(), // Date du paiement
    };
  },
  methods: {
    downloadReceipt() {
      // Fonction pour générer et télécharger le reçu
      const receiptData = {
        method: this.paymentMethod,
        amount: "1000 FCFA", // Remplacer par le montant réel du paiement
        date: this.paymentDate,
      };
      
      const receiptJSON = JSON.stringify(receiptData);
      const blob = new Blob([receiptJSON], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `reçu_${this.paymentMethod}_${this.paymentDate}.json`;
      link.click();
    },
  },
};
</script>

<style scoped>
/* Style personnalisé si nécessaire */
</style>
