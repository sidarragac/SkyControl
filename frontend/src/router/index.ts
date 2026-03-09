// Developed by Mateo Pineda, Santiago Idárraga
// External imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal imports
import AirlinesView from '@/views/AirlinesView.vue';
import CreateView from '@/views/admin/CreateView.vue';
import EditView from '@/views/admin/EditView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { UserService } from '@/services/UserService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/airlines', name: 'airlines', component: AirlinesView, meta: { title: 'Airlines' } },
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
router.beforeEach((to, from, next) => {
  const user = UserService.getLoggedInUser();

  if (to.meta.requiresAdmin) {
    if (!user || user.role !== 'admin') {
      return next('/');
    }
  }

  next();
});

export default router;
