<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { UserService } from '@/services/UserService';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const registrationErrorMessage = ref('');

function submitRegisterForm(): void {
  try{
    const newUser: CreateUserDTO = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const existingUser = UserService.validateExistingEmail(email.value);
    if (existingUser) {
      registrationErrorMessage.value = 'The email address is already in use. Please use a different email.';
      setTimeout(() => {
        registrationErrorMessage.value = '';
      }, 5000);
      return;
    }

    UserService.createUser(newUser);
    UserService.logInUser(email.value, password.value);
    clearRegisterForm();
    router.push('home');

  } catch (error: Error | unknown) {
    registrationErrorMessage.value = `An error occurred while creating the user. Please try again.<br>Error details: ${(error as Error).message}`;
    setTimeout(() => {
      registrationErrorMessage.value = '';
    }, 5000);
  }
};

function clearRegisterForm(): void {
  name.value = '';
  email.value = '';
  password.value = '';
};
</script>

<template>
  <section class="bg-background-light dark:bg-background-dark font-display">
    <!-- Full Screen Background Image with Overlay -->
    <div
      class="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      data-alt="Aircraft wing flying through sunset clouds"
      style="
        background-image: url('https://images.unsplash.com/photo-1585445283296-91fdde699e26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      "
    >
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/10 backdrop-brightness-75"></div>

      <!-- Register Container -->
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

          <!-- Register Form -->
          <form method="POST" class="flex flex-col gap-5" @submit.prevent="submitRegisterForm()">
            <!-- Error Message -->
            <Transition name="fade">
              <div
                v-if="registrationErrorMessage"
                class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
              >
                <i
                  class="fas fa-exclamation-circle material-symbols-outlined text-red-600 dark:text-red-400"
                ></i>
                <div>
                  <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
                  <p class="text-xs text-red-700 dark:text-red-400/80" v-html="registrationErrorMessage"></p>
                </div>
              </div>
            </Transition>

             <!-- Name Field -->
            <div class="flex flex-col gap-2">
              <label class="text-white-100 text-sm font-medium leading-normal px-1" for="name"
                >Name</label
              >
              <div
                class="flex w-full items-stretch rounded-lg group border border-black-800/50 bg-primary-700/90 transition-all focus-within:ring-2 focus-within:ring-primary-700/50 focus-within:border-primary-700"
              >
                <input
                  v-model="name"
                  class="flex-1 bg-transparent text-white placeholder:text-neutral-400 focus:outline-none h-14 px-4 rounded-l-lg"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  id="name"
                  required
                />
                <div class="flex items-center justify-center px-4">
                  <i class="fas fa-user material-symbols-outlined text-neutral-400"></i>
                </div>
              </div>
            </div>

            <!-- Email Field -->
            <div class="flex flex-col gap-2">
              <label class="text-white-100 text-sm font-medium leading-normal px-1" for="email"
                >Email</label
              >
              <div
                class="flex w-full items-stretch rounded-lg group border border-black-800/50 bg-primary-700/90 transition-all focus-within:ring-2 focus-within:ring-primary-700/50 focus-within:border-primary-700"
              >
                <input
                  v-model="email"
                  class="flex-1 bg-transparent text-white placeholder:text-neutral-400 focus:outline-none h-14 px-4 rounded-l-lg"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  required
                />
                <div class="flex items-center justify-center px-4">
                  <i class="fas fa-envelope material-symbols-outlined text-neutral-400"></i>
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
                  v-model="password"
                  class="flex-1 bg-transparent text-white placeholder:text-neutral-400 focus:outline-none h-14 px-4 rounded-l-lg"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  required
                />
                <div class="flex items-center justify-center px-4">
                  <i class="fas fa-lock material-symbols-outlined text-neutral-400"></i>
                </div>
              </div>
            </div>

            <!-- Sign Up -->
            <button
              class="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-accent-500 text-black-800 text-base font-bold tracking-wide shadow-lg hover:bg-accent-500/80 active:scale-[0.98] transition-all cursor-pointer"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <!-- Login Link -->
          <div class="mt-10 pt-6 border-t border-white-100/10 flex flex-col items-center gap-4">
            <p class="text-white-100/50 text-sm">
              Already have an account?
              <RouterLink
                to="/login"
                class="text-primary text-accent-500/90 font-semibold hover:underline"
                >Sign In</RouterLink
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
