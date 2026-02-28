<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="bg-background-light dark:bg-background-dark font-display">
    <!-- Full Screen Background Image with Overlay -->
    <div
      class="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      data-alt="Aircraft wing flying through sunset clouds"
      style="
        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlqfGjon8fu2LP8HVtH0HdQ-0jEIlvroIagfPL2jajeDnC42BnX0YIpu90qAcWqWdthK2CDStDfH2ZZCs8QnVPNsO9NQ09ij_9wNfuIFcIDncuX8Pl8UYUPMuJxsVh3CsdULXOb5FG2QqLU3knN7UTOxi7-2dOO__2JybVgeoFAXOvmvR9Jf8qr2GI6doxA9crQCh9wQeePPXfYNRF-o8dkrkW8VP_waGwX_bAhWO4aGrRitzuI2MDSWrLjokp3zla2709E-40a7ZJ');
      "
    >
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>

      <!-- Login Container -->
      <div class="relative z-10 w-full max-w-120 px-6">
        <div
          class="bg-primary-900/85 backdrop-blur-md border border-primary-900/10 rounded-xl shadow-2xl p-8 md:p-12"
        >
          <!-- Brand Header -->
          <div class="flex flex-col items-center mb-8">
            <div class="bg-primary-700 p-5 rounded-xl mb-4">
              <i class="fas fa-plane-up material-symbols-outlined text-accent-500 text-3xl"></i>
            </div>

            <h1
              class="text-white-100 tracking-light text-[32px] font-bold leading-tight text-center"
            >
              SkyControl
            </h1>

            <p class="text-white-100/60 text-base font-medium leading-normal pt-2 text-center">
              Manage your fleet and operations
            </p>
          </div>

          <!-- Login Form -->
          <form class="flex flex-col gap-5">
            <!-- Username Field -->
            <div class="flex flex-col gap-2">
              <label class="text-white-100 text-sm font-medium leading-normal px-1" for="email"
                >Email</label
              >
              <div
                class="flex w-full items-stretch rounded-lg group border border-black-800/50 bg-primary-700/90 transition-all focus-within:ring-2 focus-within:ring-primary-700/50 focus-within:border-primary-700"
              >
                <input
                  class="flex-1 bg-transparent text-white placeholder:text-neutral-400 focus:outline-none h-14 px-4 rounded-l-lg"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                />
                <div class="flex items-center justify-center px-4">
                  <i class="fas fa-user material-symbols-outlined text-neutral-400"></i>
                </div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="flex flex-col gap-2">
              <label class="text-white-100 text-sm font-medium leading-normal px-1" for="password"
                >Password</label
              >
              <div
                class="flex w-full items-stretch rounded-lg group border border-black-800/50 bg-primary-700/90 transition-all focus-within:ring-2 focus-within:ring-primary-700/50 focus-within:border-primary-700"
              >
                <input
                  class="flex-1 bg-transparent text-white placeholder:text-neutral-400 focus:outline-none h-14 px-4 rounded-l-lg"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                />
                <div class="flex items-center justify-center px-4">
                  <i class="fas fa-lock material-symbols-outlined text-neutral-400"></i>
                </div>
              </div>
            </div>

            <!-- Sign In Button -->
            <button
              class="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-accent-500 text-black-800 text-base font-bold tracking-wide shadow-lg hover:bg-accent-500/80 active:scale-[0.98] transition-all cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <!-- Register Link -->
          <div class="mt-10 pt-6 border-t border-white-100/10 flex flex-col items-center gap-4">
            <p class="text-white-100/50 text-sm">
              Don't have an account?
              <RouterLink
                to="/register"
                class="text-primary text-accent-500/90 font-semibold hover:underline"
                >Register</RouterLink
              >
            </p>
          </div>

          <div class="w-full flex justify-center">
            <RouterLink
              to="/home"
              class="text-white-100 hover:text-white-100/80 py-5 text-sm cursor-pointer text-center transition-colors"
            >
              &larr; Go back to Home
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
