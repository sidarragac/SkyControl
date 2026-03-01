import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateView from '../views/admin/CreateView.vue';

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
      component: CreateView,
      meta: { title: 'Edit Entries', layout: 'none' },
    },
  ],
});

export default router;
