<template>
  <StudentLayout>
    <!-- Affichage des vues enfant ici -->
    <router-view />
  </StudentLayout>
</template>

<script>
import StudentLayout from '@/components/Student/StudentLayout.vue';

export default {
  name: "StudentDashboard",
  components: {
    StudentLayout,
  },
};
</script>
