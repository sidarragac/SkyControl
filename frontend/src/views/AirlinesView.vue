<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import DataTableComponent from '@/components/DataTableComponent.vue';
import { AirlineService } from '@/services/AirlineService';
import { AircraftService } from '@/services/AircraftService';

const airlines = AirlineService.getAirlines();
const tableHeaders = ['Airline', 'Country', 'Number Of Destinations', 'Favourite Aircraft'];

// Reactive Variables
const tableData = computed(() => {
  const data: Record<string, unknown>[] = [];
  airlines.forEach(airline => {
    data.push({
      Name: airline.name,
      ImageURL: airline.imageURL,
      Country: airline.country,
      'NumberOfDestinations': getAirlineNumberOfDestinations(airline.id),
      'FavouriteAircraft': getAirlineFavouriteAircraft(airline.id)
    });
  });
  return data;
});

// Functions
function getAirlineFavouriteAircraft(airlineId: string): string {
  const aircrafts = AircraftService.getAircraftsByAirline(airlineId);

  if (aircrafts.length === 0) {
    return 'N/A';
  }

  const modelCount = new Map<string, number>();

  aircrafts.forEach(aircraft => {
    const currentCount = modelCount.get(aircraft.model) || 0;
    modelCount.set(aircraft.model, currentCount + 1);
  });

  let mostRepeatedModel = '';
  let maxCount = 0;

  modelCount.forEach((count, model) => {
    if (count > maxCount) {
      maxCount = count;
      mostRepeatedModel = model;
    }
  });

  return mostRepeatedModel;
}

function getAirlineNumberOfDestinations(airlineId: string): number {
  const airline = AirlineService.getAirlineById(airlineId);
  if (!airline) {
    return 0;
  }
  return airline.destinations.length;
}
</script>
<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Airlines Information</h2>
      <p>Get to know some of the most well known airlines in the world.</p>
    </header>

    <DataTableComponent
      :headers="tableHeaders"
      :data="tableData"
      :useDisplayInFirstColumn="true"
      mainTextKey="Name"
      imageKey="ImageURL"
    />
  </div>
</template>
