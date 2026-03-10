<!-- Developed by Juan Jara -->
<script setup lang="ts">
// Internal imports
import DashboardStatCardComponent from '@/components/dashboard/DashboardStatCardComponent.vue';

// Props
defineProps<{
  totalAircrafts: number;
  activeAirlines: number;
  manufacturers: number;
  fleetHealth: number;
}>();
</script>

<template>
  <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
    <DashboardStatCardComponent
      label="Total Aircraft"
      :value="totalAircrafts.toLocaleString()"
      icon="fa-fighter-jet"
      icon-bg-class="bg-primary-900/10"
      icon-color-class="text-primary-900"
      trend="+2.4%"
      :trend-positive="true"
    />
    <DashboardStatCardComponent
      label="Active Airlines"
      :value="activeAirlines.toLocaleString()"
      icon="fa-globe"
      icon-bg-class="bg-accent-500/10"
      icon-color-class="text-accent-500"
      trend="+1.2%"
      :trend-positive="true"
    />
    <DashboardStatCardComponent
      label="Manufacturers"
      :value="manufacturers"
      icon="fa-industry"
      icon-bg-class="bg-secondary-700/10"
      icon-color-class="text-secondary-700"
      trend="Primary"
      :trend-neutral="true"
    />
    <DashboardStatCardComponent
      label="Fleet Health"
      :value="`${fleetHealth}%`"
      icon="fa-check-circle"
      icon-bg-class="bg-green-100"
      icon-color-class="text-green-600"
      trend="-0.5%"
      :trend-positive="false"
    />
  </div>
</template>
