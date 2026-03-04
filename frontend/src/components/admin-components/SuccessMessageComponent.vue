<script setup lang="ts">
const props = defineProps<{
  successMessage: string;
}>();
</script>

<template>
  <Transition name="fade" class="fixed top-4 w-1/2 left-1/2 transform -translate-x-1/2 z-50">
    <div
      v-if="props.successMessage"
      class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
    >
      <i class="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
      <div>
        <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
        <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
          {{ props.successMessage }}
        </p>
      </div>
    </div>
  </Transition>
</template>
