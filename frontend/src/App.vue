<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <body class="bg-silk text-slate-900 min-h-screen">
    <div class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      <aside class="w-64 flex flex-col bg-cascade text-white">
        <!-- Logo and Title -->
        <div class="p-6 flex items-center gap-3">
          <div class="bg-cinnamon rounded-lg p-1.5 shadow-lg">
            <i class="fas fa-plane-up material-symbols-outlined text-white text-2xl"></i>
          </div>
          <div>
            <h1 class="text-base font-bold leading-none text-white">SkyControl</h1>
            <p class="text-[10px] text-white/60 mt-1 uppercase tracking-widest font-bold">
              Fleet Management
            </p>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 px-4 space-y-1 mt-4">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-apricot"
          >
            <i class="fas fa-home material-symbols-outlined"></i>
            <span class="text-sm font-medium">Home</span>
          </RouterLink>

          <RouterLink
            to="/aircrafts"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <i class="fas fa-plane material-symbols-outlined"></i>
            <span class="text-sm font-medium">Aircrafts</span>
          </RouterLink>

          <RouterLink
            to="/airlines"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <i class="fas fa-building material-symbols-outlined"></i>
            <span class="text-sm font-medium">Airlines</span>
          </RouterLink>

          <RouterLink
            to="/manufacturers"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <i class="fas fa-industry material-symbols-outlined"></i>
            <span class="text-sm font-medium">Manufacturers</span>
          </RouterLink>

          <RouterLink
            to="/aircrafts/create"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <i class="fas fa-plus material-symbols-outlined"></i>
            <span class="text-sm font-medium">Add Aircraft</span>
          </RouterLink>

          <RouterLink
            to="/aircrafts/edit"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <i class="fas fa-edit material-symbols-outlined"></i>
            <span class="text-sm font-medium">Edit Aircrafts</span>
          </RouterLink>
        </nav>

        <div class="p-4 border-t border-white/10">
          <RouterLink
            to="/login"
            class="w-full bg-cinnamon hover:bg-[#b85a0d] text-white rounded-lg py-2.5 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md">
            <i class="fas fa-user material-symbols-outlined"></i>
            Login
          </RouterLink>
        </div>
      </aside>

      <main class="flex-1 flex flex-col overflow-hidden">
        <RouterView />
      </main>

    </div>
  </body>
</template>
