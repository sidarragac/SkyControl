// Developed by Mateo Pineda, Santiago Idárraga
// External imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal imports
import AircraftView from '@/views/AircraftView.vue';
import AirlineView from '@/views/AirlineView.vue';
import CreateView from '@/views/admin/CreateView.vue';
import EditView from '@/views/admin/EditView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import ManufacturerView from '@/views/ManufacturerView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import { UserService } from '@/services/UserService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/airlines', name: 'airlines', component: AirlineView, meta: { title: 'Airlines' } },
    {
      path: '/aircrafts',
      name: 'aircrafts',
      component: AircraftView,
      meta: { title: 'Aircrafts' },
    },
    {
      path: '/manufacturers',
      name: 'manufacturers',
      component: ManufacturerView,
      meta: { title: 'Manufacturers' },
    },
    {
      path: '/admin/create',
      name: 'admin-create',
      component: CreateView,
      meta: { title: 'Create Entry', requiresAdmin: true },
    },
    {
      path: '/admin/edit',
      name: 'admin-edit',
      component: EditView,
      meta: { title: 'Edit Entries', layout: 'none', requiresAdmin: true },
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

// Navigation Guards
// Title Update
router.afterEach((to) => {
  document.title = `${to.meta.title} | SkyControl`;
});

// Admin Access Control
router.beforeEach((to) => {
  const user = UserService.getLoggedInUser();
  if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    return '/';
  }
});

export default router;
