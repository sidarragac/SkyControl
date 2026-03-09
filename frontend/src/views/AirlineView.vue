<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import { AirlineService } from '@/services/AirlineService';
import { AircraftService } from '@/services/AircraftService';
import DataTableComponent from '@/components/DataTableComponent.vue';
import FilterBarComponent from '@/components/FilterBarComponent.vue';
import FleetSizePolarChartComponent from '@/components/charts/FleetSizePolarChartComponent.vue';

// Non-reactive Variables
const airlines = AirlineService.getAirlines();
const tableHeaders = ['Airline', 'Country', 'Number Of Destinations', 'Favourite Aircraft'];

// Reactive Variables
const activeFilters = ref<Record<string, string | number>>({});

const tableData = computed(() => {
  const data: Record<string, unknown>[] = [];
  airlines.forEach((airline) => {
    data.push({
      Id: airline.id,
      Name: airline.name,
      ImageURL: airline.imageURL,
      Country: airline.country,
      NumberOfDestinations: AirlineService.getNumberOfDestinations(airline.id),
      FavouriteAircraft: AirlineService.getMostCommonAircraft(airline.id),
    });
  });
  return data;
});

const filteredTableData = computed(() => {
  const sortOrder = activeFilters.value.DestinationsSort;
  let result = [...tableData.value];

  result = result.filter((row) => {
    return Object.entries(activeFilters.value).every(([key, value]) => {
      if (value === 'All') return true;

      if (key === 'Country') {
        return row[key] === value;
      }

      return true;
    });
  });

  if (sortOrder === 'desc') {
    result.sort((a, b) => (b.NumberOfDestinations as number) - (a.NumberOfDestinations as number));
  }

  if (sortOrder === 'asc') {
    result.sort((a, b) => (a.NumberOfDestinations as number) - (b.NumberOfDestinations as number));
  }

  return result;
});

const countryOptions = computed(() => {
  const countries = new Set<string>();

  tableData.value.forEach((row) => {
    countries.add(row.Country as string);
  });

  return Array.from(countries).map((country) => ({
    label: country,
    value: country,
  }));
});

const filtersConfig = computed(() => [
  {
    label: 'Country',
    key: 'Country',
    options: countryOptions.value,
  },
  {
    label: 'Sort by Destinations',
    key: 'DestinationsSort',
    options: [
      { label: 'Highest to Lowest', value: 'desc' },
      { label: 'Lowest to Highest', value: 'asc' },
    ],
  },
]);

const fleetChartData = computed(() => {
  return filteredTableData.value.map((airline) => ({
    airline: airline.Name as string,
    aircraftCount: AircraftService.getAircraftsByAirlineId(airline.Id as string).length,
  }));
});
</script>
<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Airlines Information</h2>
      <p>Get to know some of the most well known airlines in the world</p>
    </header>
    <FilterBarComponent :filters="filtersConfig" @update:filters="activeFilters = $event" />
    <FleetSizePolarChartComponent name="Fleet Size per Airline" :data="fleetChartData" />
    <DataTableComponent
      :headers="tableHeaders"
      :data="filteredTableData"
      :useDisplayInFirstColumn="true"
      mainTextKey="Name"
      imageKey="ImageURL"
    />
  </div>
</template>
