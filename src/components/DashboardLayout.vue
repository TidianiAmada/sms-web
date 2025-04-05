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
        <router-link to="/admin/dashboard/school-setup" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
          Configuration de l'école
        </router-link>
        <router-link to="/admin/dashboard/school-structure" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
          Structure de l'école
        </router-link>
        <router-link to="/admin/dashboard/registration-management" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
          Gestion Inscription
        </router-link>
        <router-link to="/admin/dashboard/tuition-fees" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
          Frais d'inscription
        </router-link>

        <!-- Transfert Section with Dropdown Icon -->
        <div>
          <div @click="toggleTransferMenu" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer flex items-center justify-between">
            Demande de Transfert
            <span :class="{'transform rotate-180': showTransferMenu}" class="transition-transform duration-200">
              <!-- SVG dropdown icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <div v-if="showTransferMenu" class="ml-4 space-y-2">
            <router-link to="/admin/dashboard/transfer-request/incoming" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Entrant
            </router-link>
            <router-link to="/admin/dashboard/transfer-request/outgoing" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Sortante
            </router-link>
          </div>
        </div>

        <router-link to="/admin/dashboard/student-management" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Demandes d'accès au workspace
        </router-link>

          <router-link to="/admin/dashboard/school-event" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Planifier
        </router-link>
         <router-link to="/admin/dashboard/list-teachers" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Professeurs
        </router-link>
         <router-link to="/admin/dashboard/list-students" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Eleves
        </router-link>
         <router-link to="/admin/dashboard/list-classes" class="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
         Classes
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
