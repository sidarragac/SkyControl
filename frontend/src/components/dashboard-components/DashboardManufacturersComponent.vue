<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';
// Props
const props = defineProps<{
  manufacturers: { name: string; count: number }[];
}>();

// Non-reactive variables
const barColors = ['bg-primary-900', 'bg-accent-500', 'bg-secondary-700', 'bg-primary-700'];

// Reactive variables
const maxCount = computed(() => props.manufacturers[0]?.count ?? 1);
</script>

<template>
  <div>
    <h3 class="text-sm font-bold text-black-800 mb-4">Top Manufacturers</h3>

    <div class="flex flex-col gap-3">
      <p v-if="manufacturers.length === 0" class="text-xs text-black-800/40 text-center py-4">
        No data available
      </p>

      <div v-for="(mfr, index) in manufacturers" :key="mfr.name" class="flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-black-800">{{ mfr.name }}</span>
          <span class="text-xs text-black-800/50"> {{ mfr.count.toLocaleString() }} aircraft </span>
        </div>
        <div class="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700"
            :class="barColors[index] ?? 'bg-primary-900'"
            :style="{ width: `${Math.round((mfr.count / maxCount) * 100)}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
