<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-72 bg-gray-800 text-white p-6 shadow-lg fixed top-0 left-0 bottom-0">
      <!-- Logo and Text on the same line -->
      <div class="flex items-center mb-8 justify-between">
        <img
          src="@/assets/education.png"  
          alt="Groupe Scolaire Saraye Logo"
          style="width: 50px; height: 50px;" 
          class="mr-3"
        />
        <div class="text-xl font-semibold text-green-500">Groupe Scolaire Saraye</div>
      </div>

      <nav class="space-y-4">
        <router-link to="/student/dashboard/school-discovery" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Trouver une ecole
        </router-link>
         <router-link to="/student/dashboard/request-status" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Statut de la demande
        </router-link>
         <router-link to="/student/dashboard/transfer-status" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Statut du tranfert
        </router-link>
         <router-link to="/student/dashboard/registration" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
        Inscription
        </router-link>
          <router-link to="/student/dashboard/payment" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
        Payement
        </router-link>
          
       
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col ml-72">
      <header class="bg-white shadow-lg px-6 py-4 flex items-center justify-between">
        <div class="text-xl font-semibold text-gray-700">Tableau de Bord Administrateur</div>
        <div class="flex items-center space-x-4">
          <img src="https://via.placeholder.com/40" alt="User Avatar" class="rounded-full w-10 h-10 border-2 border-gray-300" />
          <span class="font-medium text-gray-700">Admin</span>
        </div>
      </header>

      <main class="flex-1 p-6 bg-white rounded-t-lg shadow-md">
        <router-view />
      </main>

      <footer class="bg-gray-800 text-white text-center p-4 mt-auto shadow-inner">
        <p>&copy; 2024 Groupe Scolaire Saraye. Tous droits réservés.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTransferMenu: false, // Toggle for the transfer submenu
    };
  },
  methods: {
    toggleTransferMenu() {
      this.showTransferMenu = !this.showTransferMenu;
    },
  },
};
</script>

<style scoped>
/* Style options if needed */
</style>
