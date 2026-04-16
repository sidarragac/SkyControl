<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import { AirlineService } from '@/services/AirlineService';
import { AircraftService } from '@/services/AircraftService';
import DisplayDataComponent from '@/components/DisplayDataComponent.vue';
import FleetSizePolarChartComponent from '@/components/charts/FleetSizePolarChartComponent.vue';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';

// Non-reactive Variables
const airlines = AirlineService.getAirlines();

const tableHeaders = ['Airline', 'Country', 'Number Of Destinations', 'Favourite Aircraft'];

const tableDataKeys = tableHeaders.map((header) => {
  return header.split(' ').join('');
});

const mainTextKey = 'Name';
const imageKey = 'ImageURL';
const itemsPerPage = 5;

// Reactive Variables
const currentPage = ref(1);
const activeFilters = ref<Record<string, string | number>>({
  Country: 'All',
  DestinationsSort: 'All',
});

const totalPages = computed(() => {
  return Math.ceil(filteredTableData.value.length / itemsPerPage);
});

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

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredTableData.value.slice(start, end);
});

const fleetChartData = computed(() => {
  return filteredTableData.value.map((airline) => ({
    airline: airline.Name as string,
    aircraftCount: AircraftService.getAircraftsByAirlineId(airline.Id as string).length,
  }));
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

</script>
<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Airlines Information</h2>
      <p>Get to know some of the most well known airlines in the world</p>
    </header>
    <div class="flex flex-wrap gap-4 mb-4">
      <div class="flex flex-col">
        <!-- Filter by Country-->
        <label class="text-sm font-medium text-black-800 mb-1">
          Country
        </label>

        <select
          v-model="activeFilters['Country']"
          class="px-3 py-2 border border-neutral-100 rounded-lg bg-white-100 text-black-800 text-sm focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
        >
          <option value="All">All</option>

          <option v-for="option in countryOptions" :key="option.label" :value="option.value">
            {{ option.value }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <!-- Sort by Number of Destinations -->
        <label class="text-sm font-medium text-black-800 mb-1">
          Sort By Number of Destinations
        </label>

        <select
          v-model="activeFilters['DestinationsSort']"
          class="px-3 py-2 border border-neutral-100 rounded-lg bg-white-100 text-black-800 text-sm focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
        >
          <option value="desc">Highest to Lowest</option>
          <option value="asc">Lowest to Highest</option>
        </select>
      </div>
    </div>
    <FleetSizePolarChartComponent name="Fleet Size per Airline" :data="fleetChartData" />
    <div class="overflow-x-auto rounded-lg border border-neutral-100">
      <table class="w-full border-collapse bg-white-100 text-left text-sm">
        <thead class="bg-white-200">
          <tr>
            <th
              v-for="(header, index) in tableHeaders"
              :key="index"
              class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100"
            >
              {{ header }}
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
              v-for="(header, headerIndex) in tableDataKeys"
              :key="headerIndex"
              class="px-6 py-4 text-black-800"
            >
              <DisplayDataComponent
                v-if="headerIndex === 0"
                :mainText="row[mainTextKey] as string"
                :imageURL="row[imageKey] as string"
              />
              <slot v-else :name="header" :row="row" :value="row[header]">
                {{ row[header] }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="tableHeaders.length" class="px-6 py-8 text-center text-black-800">
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TablePaginationComponent
      v-model:currentPage="currentPage"
      :totalPages="totalPages"
      :itemsPerPage="itemsPerPage"
      :dataLength="filteredTableData.length"
    />
  </div>
</template>
