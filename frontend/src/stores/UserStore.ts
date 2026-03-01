// Developed by Mateo Pineda
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInterface } from '@/interfaces/UserInterface';

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([]);
  const loggedInUser = ref<UserInterface | null>(null);

  return { users, loggedInUser };
});
