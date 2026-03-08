<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface FilterOption {
  label: string;
  value: string | number;
}

interface FilterConfig {
  label: string;
  key: string;
  options: FilterOption[];
}

interface Props {
  filters: FilterConfig[];
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  (event: 'update:filters', value: Record<string, string | number>): void;
}>();

// Reactive Variables
const selectedFilters = ref<Record<string, string | number>>({});

// Functions
function initializeFilters(): void {
  props.filters.forEach(filter => {
    selectedFilters.value[filter.key] = 'All';
  });
}

// Watchers
watch(
  selectedFilters,
  () => {
    emit('update:filters', selectedFilters.value);
  },
  { deep: true }
);

onMounted(() => {
  initializeFilters();
});
</script>

<template>
  <div class="flex flex-wrap gap-4 mb-4">
    <div v-for="filter in filters" :key="filter.key" class="flex flex-col">
      <label class="text-sm font-medium text-slate-700 mb-1">
        {{ filter.label }}
      </label>

      <select
        v-model="selectedFilters[filter.key]"
        class="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
      >
        <option value="All">All</option>

        <option
          v-for="option in filter.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
