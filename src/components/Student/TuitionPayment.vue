<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Sélectionner un Niveau et un Plan de Paiement</h2>

      <!-- Sélection du niveau d'études -->
      <form @submit.prevent="initiatePayment">
        <div class="mb-4">
          <label for="studentLevel" class="block text-sm font-medium text-gray-600">Niveau d'Études</label>
          <select
            id="studentLevel"
            v-model="selectedLevel"
            class="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choisissez un niveau</option>
            <option value="ci">CI</option>
            <option value="cp">CP</option>
            <option value="elementary">Élémentaire</option>
            <option value="middle">Moyenne</option>
            <option value="high">Secondaire</option>
          </select>
        </div>

        <!-- Affichage des frais d'inscription et des mensualités -->
        <div v-if="selectedLevel" class="mb-4">
          <p class="text-gray-700">Frais d'inscription pour {{ selectedLevelName }} : {{ registrationFee }} FCFA</p>
          <p class="text-gray-700">Mensualités pour {{ selectedLevelName }} : {{ monthlyFee }} FCFA par mois</p>

          <!-- Option de paiement des frais d'inscription -->
          <label class="inline-flex items-center mr-4">
            <input
              type="radio"
              value="pay_registration"
              v-model="paymentType"
              class="form-radio"
              required
            />
            <span class="ml-2">Payer les frais d'inscription maintenant</span>
          </label>

          <!-- Option de paiement des mensualités -->
          <label class="inline-flex items-center mr-4">
            <input
              type="radio"
              value="pay_installments"
              v-model="paymentType"
              class="form-radio"
              required
            />
            <span class="ml-2">Payer les mensualités</span>
          </label>

          <!-- Si paiement des mensualités sélectionné -->
          <div v-if="paymentType === 'pay_installments'" class="mt-4">
            <label for="months" class="block text-sm font-medium text-gray-600">Sélectionner les mois</label>
            <div v-for="month in months" :key="month">
              <label class="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  :value="month"
                  v-model="selectedMonths"
                  class="form-checkbox"
                />
                <span class="ml-2">{{ month }}</span>
              </label>
            </div>
            <p class="text-gray-700 mt-2">Montant total des mensualités : {{ totalInstallmentAmount }} FCFA</p>
          </div>
        </div>

        <!-- Sélection du mode de paiement -->
        <div v-if="paymentType" class="mb-4">
          <p class="text-gray-700">Sélectionner un mode de paiement</p>
          <label class="inline-flex items-center mr-4">
            <input
              type="radio"
              value="wave"
              v-model="paymentMethod"
              class="form-radio"
              required
            />
            <span class="ml-2">Wave/Orange Money</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              value="stripe"
              v-model="paymentMethod"
              class="form-radio"
              required
            />
            <span class="ml-2">Stripe (Carte de Crédit)</span>
          </label>
        </div>

        <!-- Bouton de soumission -->
        <div class="mt-6">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700"
          >
            Procéder au Paiement
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLevel: "", // Niveau d'études sélectionné
      paymentType: "", // Type de paiement sélectionné (frais d'inscription ou mensualités)
      paymentMethod: "", // Méthode de paiement sélectionnée
      selectedMonths: [], // Mois sélectionnés pour paiement échelonné
      fees: { // Frais d'inscription et mensualités par niveau
        ci: { registration: 10000, monthly: 5000 },
        cp: { registration: 12000, monthly: 6000 },
        elementary: { registration: 15000, monthly: 7500 },
        middle: { registration: 18000, monthly: 9000 },
        high: { registration: 20000, monthly: 10000 }
      },
      months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    };
  },
  computed: {
    // Le nom du niveau sélectionné pour l'affichage
    selectedLevelName() {
      const levelNames = {
        ci: "CI",
        cp: "CP",
        elementary: "Élémentaire",
        middle: "Moyenne",
        high: "Secondaire"
      };
      return levelNames[this.selectedLevel] || "";
    },
    // Frais d'inscription pour le niveau sélectionné
    registrationFee() {
      return this.fees[this.selectedLevel] ? this.fees[this.selectedLevel].registration : 0;
    },
    // Frais mensuels pour le niveau sélectionné
    monthlyFee() {
      return this.fees[this.selectedLevel] ? this.fees[this.selectedLevel].monthly : 0;
    },
    // Montant total des mensualités sélectionnées
    totalInstallmentAmount() {
      return this.selectedMonths.length * this.monthlyFee;
    },
    // Montant total à payer en fonction du type de paiement choisi
    totalAmountToPay() {
      if (this.paymentType === 'pay_registration') {
        return this.registrationFee;
      } else if (this.paymentType === 'pay_installments') {
        return this.totalInstallmentAmount;
      }
      return 0;
    }
  },
  methods: {
    initiatePayment() {
      if (this.paymentMethod === "wave") {
        this.processWavePayment();
      } else if (this.paymentMethod === "stripe") {
        this.processStripePayment();
      }
    },
    async processWavePayment() {
      try {
        // Simuler la vérification du paiement via Wave
        const paymentVerified = await this.verifyWavePayment();
        if (paymentVerified) {
          this.generateReceipt("wave");
        } else {
          alert("Le paiement via Wave/Orange Money a échoué.");
        }
      } catch (error) {
        console.error("Erreur de paiement Wave/Orange Money:", error);
        alert("Erreur lors du paiement.");
      }
    },
    async processStripePayment() {
      try {
        // Simuler la vérification du paiement via Stripe
        const paymentVerified = await this.verifyStripePayment();
        if (paymentVerified) {
          this.generateReceipt("stripe");
        } else {
          alert("Le paiement via Stripe a échoué.");
        }
      } catch (error) {
        console.error("Erreur de paiement Stripe:", error);
        alert("Erreur lors du paiement.");
      }
    },
    async verifyWavePayment() {
      // Vérification simulée du paiement via Wave
      return true; // Simulation : paiement validé
    },
    async verifyStripePayment() {
      // Vérification simulée du paiement via Stripe
      return true; // Simulation : paiement validé
    },
    generateReceipt(paymentMethod) {
      // Rediriger vers la page de reçu
      this.$router.push({ name: 'PaymentReceipt', params: { method: paymentMethod, level: this.selectedLevel, fee: this.registrationFee, months: this.selectedMonths } });
    }
  }
};
</script>

<style scoped>
/* Style personnalisé si nécessaire */
</style>
