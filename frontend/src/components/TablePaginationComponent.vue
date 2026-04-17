<!-- Desarrollado por Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Props
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  dataLength: number;
}>();

// Emits
const emit = defineEmits<{
  (event: 'update:currentPage', value: number): void;
}>();

// Reactive Variables
const getPageNumbers = computed(() => {
  const pages: (number | string)[] = [];
  const maxPagesToShow = 5;

  if (props.totalPages <= maxPagesToShow) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (props.currentPage <= 3) {
      for (let i = 1; i <= Math.min(4, props.totalPages); i++) {
        pages.push(i);
      }

      if (props.totalPages > 4) {
        pages.push('...');
        pages.push(props.totalPages);
      }
    } else if (props.currentPage >= props.totalPages - 2) {
      pages.push(1);
      pages.push('...');

      for (let i = props.totalPages - 3; i <= props.totalPages; i++) {
        if (i > 1) {
          pages.push(i);
        }
      }
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(props.currentPage - 1);
      pages.push(props.currentPage);
      pages.push(props.currentPage + 1);
      pages.push('...');
      pages.push(props.totalPages);
    }
  }

  return pages;
});

// Functions
function goToPage(page: number): void {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
}

function nextPage(): void {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
}

function prevPage(): void {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
    <div class="text-sm text-black-800">
      Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
      {{ Math.min(currentPage * itemsPerPage, dataLength) }} of {{ dataLength }} records
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-2 text-sm font-medium text-black-800 bg-white-100 border border-neutral-100 rounded-lg hover:bg-white-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <div class="flex items-center gap-1">
        <button
          v-for="(page, index) in getPageNumbers"
          :key="index"
          @click="typeof page === 'number' ? goToPage(page) : null"
          :disabled="page === '...'"
          :class="[
            'min-w-10 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            page === currentPage
              ? 'bg-primary-700 text-white-100 shadow-md ring-2 ring-primary-900/30 hover:bg-primary-900'
              : 'text-black-800 bg-white-100 border border-neutral-100 hover:bg-white-200',
            page === '...' ? 'cursor-default border-0 hover:bg-white-100' : '',
          ]"
        >
          {{ page }}
        </button>
      </div>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 text-sm font-medium text-black-800 bg-white-100 border border-neutral-100 rounded-lg hover:bg-white-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </div>
</template>
