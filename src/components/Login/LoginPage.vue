<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg transform transition duration-300 hover:shadow-2xl">
      <!-- Logo and Title -->
      <div class="flex items-center justify-between mb-8">
        <img
          src="@/assets/education.png"
          alt="Groupe Scolaire Saraye Logo"
          style="width: 50px; height: 50px;"
          class="mr-3"
        />
        <div class="text-2xl font-semibold text-blue-500">Groupe Scolaire Saraye</div>
      </div>
      <h2 class="text-2xl font-bold text-center text-blue-800 mb-8">Connexion</h2>

      <!-- Username Input -->
      <label class="block mb-4">
        <span class="text-gray-700 font-semibold">Nom d'utilisateur</span>
        <input
          type="text"
          v-model="username"
          placeholder="Votre nom d'utilisateur"
          class="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </label>

      <!-- Password Input -->
      <label class="block mb-6">
        <span class="text-gray-700 font-semibold">Mot de passe</span>
        <input
          type="password"
          v-model="password"
          placeholder="Votre mot de passe"
          class="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </label>

      <!-- User Type Selection -->
      <label class="block mb-6">
        <span class="text-gray-700 font-semibold">Type d'utilisateur</span>
        <select
          v-model="userType"
          class="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        >
          <option value="admin">Administrateur</option>
          <option value="student">Étudiant</option>
        </select>
      </label>

      <!-- Submit Button -->
      <button
        @click="login"
        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      userType: 'admin', // Par défaut, rôle administrateur
    };
  },
  methods: {
    login() {
      if (this.userType === 'admin') {
        this.$router.push('/admin/dashboard');
      } else {
        this.$router.push('/student/dashboard');
      }
    },
  },
};
</script>

<style scoped>
/* Ajouts de style si nécessaire */
</style>
