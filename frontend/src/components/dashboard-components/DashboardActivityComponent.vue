<!-- Developed by Juan Jara -->
<script setup lang="ts">
// Props
defineProps<{
  activities: {
    id: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    title: string;
    subtitle: string;
    time: string;
  }[];
}>();
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold text-black-800">Recent Activity</h3>
      <button
        class="text-xs text-primary-700 hover:text-accent-500 font-semibold transition-colors"
      >
        View All
      </button>
    </div>

    <div class="flex flex-col gap-3">
      <p v-if="activities.length === 0" class="text-xs text-black-800/40 text-center py-4">
        No recent activity
      </p>

      <div v-for="activity in activities" :key="activity.id" class="flex items-start gap-3">
        <div
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5',
            activity.iconBg,
          ]"
        >
          <i :class="['fas text-xs', activity.icon, activity.iconColor]"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-black-800 leading-snug">
            {{ activity.title }}
          </p>
          <p class="text-[11px] text-black-800/50 leading-snug mt-0.5 truncate">
            {{ activity.subtitle }}
          </p>
          <p class="text-[10px] text-black-800/40 mt-1">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
