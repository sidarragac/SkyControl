<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import { AirlineService } from '@/services/AirlineService';
import { AircraftService } from '@/services/AircraftService';
import { ManufacturerService } from '@/services/ManufacturerService';
import DataTableComponent from '@/components/DataTableComponent.vue';

// Non-reactive Variables
const aircrafts = AircraftService.getAircrafts();
const tableHeaders = ['Aircraft', 'Airline', 'Manufacturer', 'Passenger Capacity', 'First Flight Date'];

// Reactive Variables
const tableData = computed(() => {
  const data: Record<string, unknown>[] = [];
  aircrafts.forEach((aircraft) => {
    data.push({
      Id: aircraft.id,
      Registry: aircraft.registry,
      Model: aircraft.model,
      ImageURL: aircraft.imageURL,
      PassengerCapacity: aircraft.passengerCapacity,
      FirstFlightDate: aircraft.firstFlightDate.split('T')[0],
      Airline: AirlineService.getAirlineById(aircraft.airlineId)?.name || 'Unknown',
      Manufacturer: ManufacturerService.getManufacturerById(aircraft.manufacturerId)?.name || 'Unknown'
    });
  });
  return data;
});
</script>
<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Aircraft Information</h2>
      <p>Get to know some of the most representative aircrafts in the world</p>
    </header>
    <DataTableComponent
      :headers="tableHeaders"
      :data="tableData"
      :useDisplayInFirstColumn="true"
      mainTextKey="Registry"
      secondaryTextKey="Model"
      imageKey="ImageURL"
    />
  </div>
</template>
