// Developed by Mateo Pineda
// External imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal imports
import CreateView from '@/views/admin/CreateView.vue';
import EditView from '@/views/admin/EditView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    {
      path: '/admin/create',
      name: 'admin-create',
      component: CreateView,
      meta: { title: 'Create Entry' },
    },
    {
      path: '/admin/edit',
      name: 'admin-edit',
      component: EditView,
      meta: { title: 'Edit Entries', layout: 'none' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login', layout: 'none' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: 'Sign Up', layout: 'none' },
    },
  ],
});

export default router;
