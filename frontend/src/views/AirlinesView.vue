<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import { AirlineService } from '@/services/AirlineService';
import { AircraftService } from '@/services/AircraftService';
import DataTableComponent from '@/components/DataTableComponent.vue';
import FilterBarComponent from '@/components/FilterBarComponent.vue';

const airlines = AirlineService.getAirlines();
const tableHeaders = ['Airline', 'Country', 'Number Of Destinations', 'Favourite Aircraft'];

// Reactive Variables
const activeFilters = ref<Record<string, string | number>>({});

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

const filteredTableData = computed(() => {
  return tableData.value.filter(row => {
    return Object.entries(activeFilters.value).every(([key, value]) => {
      if (value === 'All') {
        return true;
      }

      return row[key] === value;
    });
  });
});

const countryOptions = computed(() => {
  const countries = new Set<string>();

  tableData.value.forEach(row => {
    countries.add(row.Country as string);
  });

  return Array.from(countries).map(country => ({
    label: country,
    value: country
  }));
});

const filtersConfig = computed(() => [
  {
    label: 'Country',
    key: 'Country',
    options: countryOptions.value
  }
]);

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
    <FilterBarComponent
      :filters="filtersConfig"
      @update:filters="activeFilters = $event"
    />
    <DataTableComponent
      :headers="tableHeaders"
      :data="filteredTableData"
      :useDisplayInFirstColumn="true"
      mainTextKey="Name"
      imageKey="ImageURL"
    />
  </div>
</template>
