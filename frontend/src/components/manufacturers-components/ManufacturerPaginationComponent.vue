<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Props
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

// Emits
const emit = defineEmits<{
  'update:currentPage': [value: number];
}>();

// Selectors
const pages = computed(() => {
  const range: (number | '...')[] = [];
  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1 || i === props.totalPages || Math.abs(i - props.currentPage) <= 1) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
});

// Functions
function goTo(page: number | '...') {
  if (typeof page === 'number') emit('update:currentPage', page);
}
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <button
      @click="emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="w-8 h-8 rounded-lg border border-neutral-100 flex items-center justify-center text-black-800/50 hover:border-primary-700 hover:text-primary-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <i class="fas fa-chevron-left text-xs"></i>
    </button>

    <button
      v-for="page in pages"
      :key="String(page)"
      @click="goTo(page)"
      :disabled="page === '...'"
      :class="[
        'w-8 h-8 rounded-lg border text-xs font-semibold transition-colors',
        page === currentPage
          ? 'bg-primary-900 text-white-100 border-primary-900'
          : page === '...'
            ? 'border-transparent text-black-800/40 cursor-default'
            : 'border-neutral-100 text-black-800/60 hover:border-primary-700 hover:text-primary-900',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="w-8 h-8 rounded-lg border border-neutral-100 flex items-center justify-center text-black-800/50 hover:border-primary-700 hover:text-primary-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <i class="fas fa-chevron-right text-xs"></i>
    </button>
  </div>
</template>
