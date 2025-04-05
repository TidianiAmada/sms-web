<template>
  <DashboardLayout>
    <!-- Affichage des vues enfant ici -->
    <router-view />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '@/components/DashboardLayout.vue';

export default {
  name: "AdminDashboard",
  components: {
    DashboardLayout,
  },
};
</script>
