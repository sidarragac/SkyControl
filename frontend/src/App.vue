<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isOpen = ref(false);
const activeLink = ref('home');
</script>

<template>
  <body class="min-h-screen">
    <div class="flex h-screen bg-white-200">
      <button
        @click="isOpen = !isOpen"
        class="md:hidden pr-4 py-3 pl-1 mt-auto mb-auto rounded-r-4xl bg-primary-900 text-white-100"
      >
        <i class="fas fa-caret-right material-symbols-outlined"></i>
      </button>

      <!-- Sidebar -->
      <aside
        :class="[
          'fixed md:static flex flex-col inset-y-0 left-0 z-50 w-64 transform bg-primary-900 text-white-100 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:flex md:flex-col',
        ]"
      >
        <!-- Logo and Title -->
        <div class="p-6 flex items-center gap-3">
          <div class="bg-primary-700 rounded-lg p-1.5 shadow-lg">
            <i class="fas fa-plane-up material-symbols-outlined text-accent-500 text-2xl"></i>
          </div>
          <div>
            <h1 class="text-base font-bold leading-none">SkyControl</h1>
            <p class="text-[10px] text-neutral-100/80 mt-1 uppercase tracking-widest font-bold">
              Fleet Management
            </p>
          </div>
        </div>

        <button @click="isOpen = false" class="absolute top-4 right-4 md:hidden">
          <i class="fas fa-caret-left material-symbols-outlined"></i>
        </button>

        <!-- Navigation Links -->
        <nav class="flex-1 px-4 space-y-1 mt-4">
          <RouterLink
            to="/"
            @click="activeLink = 'home'"
            :class="[
              'group flex items-center gap-3 px-3 py-2 rounded-lg',
              activeLink === 'home'
                ? 'bg-secondary-700 text-white-100'
                : 'hover:bg-primary-700 hover:text-white-100 transition-colors',
            ]"
          >
            <i
              class="fas fa-home material-symbols-outlined transition-colors group-hover:text-accent-500"
              :class="activeLink == 'home' ? 'text-accent-500' : 'text-neutral-100/80'"
            ></i>
            <span class="text-sm font-medium">Home</span>
          </RouterLink>

          <RouterLink
            to="/aircrafts"
            @click="activeLink = 'aircrafts'"
            :class="[
              'group flex items-center gap-3 px-3 py-2 rounded-lg',
              activeLink === 'aircrafts'
                ? 'bg-secondary-700 text-white-100'
                : 'hover:bg-primary-700 hover:text-white-100 transition-colors',
            ]"
          >
            <i
              class="fas fa-plane material-symbols-outlined transition-colors group-hover:text-accent-500"
              :class="activeLink == 'aircrafts' ? 'text-accent-500' : 'text-neutral-100/80'"
            ></i>
            <span class="text-sm font-medium">Aircrafts</span>
          </RouterLink>

          <RouterLink
            to="/airlines"
            @click="activeLink = 'airlines'"
            :class="[
              'group flex items-center gap-3 px-3 py-2 rounded-lg',
              activeLink === 'airlines'
                ? 'bg-secondary-700 text-white-100'
                : 'hover:bg-primary-700 hover:text-white-100 transition-colors',
            ]"
          >
            <i
              class="fas fa-building material-symbols-outlined transition-colors group-hover:text-accent-500"
              :class="activeLink == 'airlines' ? 'text-accent-500' : 'text-neutral-100/80'"
            ></i>
            <span class="text-sm font-medium">Airlines</span>
          </RouterLink>

          <RouterLink
            to="/manufacturers"
            @click="activeLink = 'manufacturers'"
            :class="[
              'group flex items-center gap-3 px-3 py-2 rounded-lg',
              activeLink === 'manufacturers'
                ? 'bg-secondary-700 text-white-100'
                : 'hover:bg-primary-700 hover:text-white-100 transition-colors',
            ]"
          >
            <i
              class="fas fa-industry material-symbols-outlined transition-colors group-hover:text-accent-500"
              :class="activeLink == 'manufacturers' ? 'text-accent-500' : 'text-neutral-100/80'"
            ></i>
            <span class="text-sm font-medium">Manufacturers</span>
          </RouterLink>

          <RouterLink
            to="/admin/create"
            @click="activeLink = 'admin-create'"
            :class="[
              'group flex items-center gap-3 px-3 py-2 rounded-lg',
              activeLink === 'admin-create'
                ? 'bg-secondary-700 text-white-100'
                : 'hover:bg-primary-700 hover:text-white-100 transition-colors',
            ]"
          >
            <i
              class="fas fa-plus material-symbols-outlined transition-colors group-hover:text-accent-500"
              :class="activeLink == 'admin-create' ? 'text-accent-500' : 'text-neutral-100/80'"
            ></i>
            <span class="text-sm font-medium">Add Elements</span>
          </RouterLink>

          <RouterLink
            to="/admin/edit"
            @click="activeLink = 'admin-edit'"
            :class="[
              'group flex items-center gap-3 px-3 py-2 rounded-lg',
              activeLink === 'admin-edit'
                ? 'bg-secondary-700 text-white-100'
                : 'hover:bg-primary-700 hover:text-white-100 transition-colors',
            ]"
          >
            <i
              class="fas fa-edit material-symbols-outlined transition-colors group-hover:text-accent-500"
              :class="activeLink == 'admin-edit' ? 'text-accent-500' : 'text-neutral-100/80'"
            ></i>
            <span class="text-sm font-medium">Edit Elements</span>
          </RouterLink>
        </nav>

        <div class="p-4 border-t border-neutral-100/20">
          <RouterLink
            to="/login"
            class="w-full bg-accent-500 text-black-900 hover:bg-accent-500/90 rounded-lg py-2.5 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <i class="fas fa-user material-symbols-outlined text-black-900"></i>
            Login
          </RouterLink>
        </div>
      </aside>

      <main class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-white-200">
        <RouterView />
      </main>
    </div>
  </body>
</template>