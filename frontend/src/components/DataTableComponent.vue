<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { ref, computed } from 'vue';

// Internal imports
import DisplayDataComponent from './DisplayDataComponent.vue';

type HeaderType = string | { label: string; key: string };

interface Props {
  headers: HeaderType[];
  data: Record<string, unknown>[];
  itemsPerPage?: number;
  useDisplayInFirstColumn?: boolean;
  mainTextKey?: string;
  secondaryTextKey?: string;
  imageKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 5,
  useDisplayInFirstColumn: false,
  mainTextKey: '',
  secondaryTextKey: '',
  imageKey: '',
});

// Reactive variables
const currentPage = ref(1);

const normalizedHeaders = computed(() => {
  return props.headers.map((header) => {
    if (typeof header === 'string') {
      const key = header.replace(/\s+/g, '');

      return { label: header, key };
    }

    return header;
  });
});

const totalPages = computed(() => {
  return Math.ceil(props.data.length / props.itemsPerPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;

  return props.data.slice(start, end);
});

const getPageNumbers = computed(() => {
  const pages: (number | string)[] = [];
  const maxPagesToShow = 5;

  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      for (let i = 1; i <= Math.min(4, totalPages.value); i++) {
        pages.push(i);
      }
      if (totalPages.value > 4) {
        pages.push('...');
        pages.push(totalPages.value);
      }
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        if (i > 1) {
          pages.push(i);
        }
      }
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage.value - 1);
      pages.push(currentPage.value);
      pages.push(currentPage.value + 1);
      pages.push('...');
      pages.push(totalPages.value);
    }
  }

  return pages;
});

// Functions
function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function nextPage(): void {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage(): void {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div class="w-full">
    <div class="overflow-x-auto rounded-lg border border-neutral-100">
      <table class="w-full border-collapse bg-white-100 text-left text-sm">
        <thead class="bg-white-200">
          <tr>
            <th
              v-for="(header, index) in normalizedHeaders"
              :key="index"
              class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            class="hover:bg-white-200 transition-colors"
          >
            <td
              v-for="(header, headerIndex) in normalizedHeaders"
              :key="headerIndex"
              class="px-6 py-4 text-black-800"
            >
              <DisplayDataComponent
                v-if="useDisplayInFirstColumn && headerIndex === 0"
                :mainText="row[mainTextKey] as string"
                :secondaryText="row[secondaryTextKey] as string"
                :imageURL="row[imageKey] as string"
              />
              <slot v-else :name="header.key" :row="row" :value="row[header.key]">
                {{ row[header.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="normalizedHeaders.length" class="px-6 py-8 text-center text-black-800">
              No hay datos disponibles
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
      <div class="text-sm text-black-800">
        Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} -
        {{ Math.min(currentPage * itemsPerPage, data.length) }} de {{ data.length }} registros
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-black-800 bg-white-100 border border-neutral-100 rounded-lg hover:bg-white-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>
        <div class="flex items-center gap-1">
          <button
            v-for="(page, index) in getPageNumbers"
            :key="index"
            @click="typeof page === 'number' ? goToPage(page) : null"
            :disabled="page === '...'"
            :class="[
              'min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-colors',
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
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>
