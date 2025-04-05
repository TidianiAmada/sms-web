import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/Login/LoginPage.vue';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import StudentDashboard from '@/pages/StudentDashboard.vue';
import SchoolSetup from '@/components/SchoolSetup.vue';
import SchoolStructure from '@/components/SchoolStructure.vue';
import RegistrationManagement from '@/components/RegistrationManagement.vue';
import TuitionFees from '@/components/TuitionFees.vue';
import RequestIncoming from '@/components/TransferRequest/RequestIncoming.vue';
import RequestOutgoing from '@/components/TransferRequest/RequestOutgoing.vue';
import StudentManagement from '@/components/StudentManagement.vue';
import SchoolDiscovery from '@/components/Student/SchoolDiscovery.vue';
import RequestStatus from '@/components/Student/RequestStatus.vue';
import TranferStatus from '@/components/Student/TransferStatus.vue';
import StudentRegistration from '@/components/Student/StudentRegistration.vue';
import TuitionPayment  from '@/components/Student/TuitionPayment.vue';
import CreateEvent  from '@/components/Event/CreateEvent.vue';

import ListTeachers  from '@/components/Teachers/ListTeachers.vue';
import ListClasses from '@/components/Classe/ListClasses.vue';
import ListStudents from '@/components/Student/ListStudents.vue';

import DetailsTeacher  from '@/components/Teachers/DetailsTeacher.vue';
import DetailsClasse from '@/components/Classe/DetailsClasse.vue';
import DetailsStudent from '@/components/Student/DetailsStudent.vue';





const routes = [
  {
    path: '/',
    component: LoginPage, // Page de connexion
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    children: [
      { path: 'admin/dashboard', redirect: 'school-setup' },
      { path: 'school-setup', component: SchoolSetup },
      { path: 'school-structure', component: SchoolStructure },
      { path: 'registration-management', component: RegistrationManagement },
      { path: 'tuition-fees', component: TuitionFees },
      { path: 'transfer-request/outgoing', component: RequestOutgoing },
      { path: 'transfer-request/incoming', component: RequestIncoming },
      { path: 'student-management', component: StudentManagement },
      { path: 'school-event', component: CreateEvent },
      { path: 'list-students', component: ListStudents },
      { path: 'list-teachers', component: ListTeachers },
      { path: 'list-classes', component: ListClasses },
      {
        path: 'details-student/:id',
        component: DetailsStudent,
        name: 'details-student',
      },
      {
        path: 'details-teacher/:id',
        component: DetailsTeacher,
        name: 'details-teacher',
      },
      {
        path: 'details-classe/:id',
        component: DetailsClasse,
        name: 'details-classe',
      }
      
    ],
  },
  {
    path: '/student/dashboard',
    component: StudentDashboard,
    children: [
      { path: 'school-discovery', component: SchoolDiscovery },
      { path: 'request-status', component: RequestStatus },
      { path: 'transfer-status', component: TranferStatus },
      { path: 'registration', component: StudentRegistration },
      { path: 'payment', component: TuitionPayment },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
