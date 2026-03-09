<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Props
const props = defineProps<{
  label: string;
  value: string | number;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  trend?: string;
  trendPositive?: boolean;
  trendNeutral?: boolean;
}>();

// Reactive variables
const trendColorClass = computed(() => {
  if (props.trendNeutral) return 'text-black-800/40';
  return props.trendPositive ? 'text-green-600' : 'text-red-500';
});

const trendIcon = computed(() => {
  if (props.trendNeutral) return '';
  return props.trendPositive ? 'fa-arrow-up' : 'fa-arrow-down';
});
</script>

<template>
  <div class="bg-white-100 rounded-xl p-4 shadow-sm border border-neutral-100/40">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs text-black-800/50 font-medium uppercase tracking-wide">
          {{ label }}
        </p>
        <p class="text-2xl font-bold text-black-800 mt-1">{{ value }}</p>
        <p v-if="trend" class="text-xs mt-1 font-medium" :class="trendColorClass">
          <i v-if="!trendNeutral" class="fas text-[10px]" :class="trendIcon"></i>
          {{ trend }}
        </p>
      </div>
      <div class="p-2.5 rounded-lg" :class="iconBgClass">
        <i class="fas text-base" :class="[icon, iconColorClass]"></i>
      </div>
    </div>
  </div>
</template>
