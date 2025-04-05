<template>
  <!-- Zone principale pour afficher les routes enfants -->
  <div id="app">
    <!-- Contenu dynamique en fonction de la route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Vous pouvez ajouter ici des styles globaux pour le fond, la police, etc. */
#app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
}
</style>
