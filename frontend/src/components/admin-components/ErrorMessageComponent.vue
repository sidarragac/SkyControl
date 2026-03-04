<script setup lang="ts">
const props = defineProps<{
  errorMessage: string;
}>();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="props.errorMessage"
      class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
    >
      <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400"></i>
      <div>
        <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
        <p class="text-xs text-red-700 dark:text-red-400/80" v-html="props.errorMessage"></p>
      </div>
    </div>
  </Transition>
</template>
