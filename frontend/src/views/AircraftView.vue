<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { onMounted, computed, ref } from 'vue';

// Internal imports
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import { AircraftService } from '@/services/AircraftService';
import AircraftModelChartComponent from '@/components/charts/AircraftModelChartComponent.vue';
import DisplayDataComponent from '@/components/DisplayDataComponent.vue';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';

// Non-reactive Variables
const tableDataKeys = [
  'Aircraft',
  'Airline',
  'Manufacturer',
  'PassengerCapacity',
  'FirstFlightDate',
];
const tableColumnCount = tableDataKeys.length;

const mainTextKey = 'Registry';
const secondaryTextKey = 'Model';
const imageKey = 'ImageURL';
const itemsPerPage = 5;

// Reactive Variables
const aircrafts = ref<AircraftInterface[]>([]);
const currentPage = ref(1);
const activeFilters = ref<Record<string, string | number>>({});
const isLoading = ref(true);

const totalPages = computed(() => {
  return Math.ceil(filteredTableData.value.length / itemsPerPage);
});

const tableData = computed(() => {
  const data: Record<string, unknown>[] = [];
  aircrafts.value.forEach((aircraft) => {
    data.push({
      Id: aircraft.id,
      Registry: aircraft.registry,
      Model: aircraft.model,
      ImageURL: aircraft.imageURL,
      PassengerCapacity: aircraft.passengerCapacity,
      FirstFlightDate: aircraft.firstFlightDate.split('T')[0],
      Airline: aircraft.airline?.name || 'Unassigned',
      AirlineId: aircraft.airline?.id,
      Manufacturer: aircraft.manufacturer.name,
      ManufacturerId: aircraft.manufacturer.id,
    });
  });
  return data;
});

const filteredTableData = computed(() => {
  const capacitySort = activeFilters.value.CapacitySort;
  const dateSort = activeFilters.value.DateSort;
  let result = [...tableData.value];

  result = result.filter((row) => {
    return Object.entries(activeFilters.value).every(([key, value]) => {
      if (value === 'All') return true;

      if (key === 'Manufacturer') {
        return row['ManufacturerId'] === value;
      }

      if (key === 'Airline') {
        return row['AirlineId'] === value;
      }

      return true;
    });
  });

  if (capacitySort === 'desc') {
    result.sort((a, b) => (b.PassengerCapacity as number) - (a.PassengerCapacity as number));
  }

  if (capacitySort === 'asc') {
    result.sort((a, b) => (a.PassengerCapacity as number) - (b.PassengerCapacity as number));
  }

  if (dateSort === 'desc') {
    result.sort(
      (a, b) =>
        new Date(b.FirstFlightDate as string).getTime() -
        new Date(a.FirstFlightDate as string).getTime(),
    );
  }

  if (dateSort === 'asc') {
    result.sort(
      (a, b) =>
        new Date(a.FirstFlightDate as string).getTime() -
        new Date(b.FirstFlightDate as string).getTime(),
    );
  }

  return result;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredTableData.value.slice(start, end);
});

const aircraftModelChartData = computed(() => {
  const counts = new Map<string, number>();

  filteredTableData.value.forEach((aircraft) => {
    const model = aircraft.Model as string;
    counts.set(model, (counts.get(model) || 0) + 1);
  });

  return Array.from(counts.entries()).map(([model, count]) => ({
    model,
    count,
  }));
});

const manufacturerOptions = computed(() => {
  const manufacturers = new Map<string, string>();

  tableData.value.forEach((row) => {
    manufacturers.set(row.ManufacturerId as string, row.Manufacturer as string);
  });

  return Array.from(manufacturers.entries()).map(([id, name]) => ({
    label: name,
    value: id,
  }));
});

const airlineOptions = computed(() => {
  const airlines = new Map<string, string>();

  tableData.value.forEach((row) => {
    airlines.set(row.AirlineId as string, row.Airline as string);
  });

  return Array.from(airlines.entries()).map(([id, name]) => ({
    label: name,
    value: id,
  }));
});

// onMounted
onMounted(async () => {
  try {
    console.log('Fetching aircrafts...');
    aircrafts.value = await AircraftService.getAircrafts();
    console.log('Aircrafts fetched:', aircrafts.value);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div v-if="!isLoading" class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Aircraft Information</h2>
      <p>Get to know some of the most representative aircrafts in the world</p>
    </header>
    <div class="flex flex-wrap gap-4 mb-4">
      <div class="flex flex-col">
        <!-- Filter by Manufacturer-->
        <label class="text-sm font-medium text-black-800 mb-1"> Manufacturer </label>

        <select
          v-model="activeFilters['Manufacturer']"
          class="px-3 py-2 border border-neutral-100 rounded-lg bg-white-100 text-black-800 text-sm focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
        >
          <option value="All">All</option>

          <option v-for="option in manufacturerOptions" :key="option.label" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <!-- Filter by Airline -->
        <label class="text-sm font-medium text-black-800 mb-1"> Airline </label>

        <select
          v-model="activeFilters['Airline']"
          class="px-3 py-2 border border-neutral-100 rounded-lg bg-white-100 text-black-800 text-sm focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
        >
          <option value="All">All</option>

          <option v-for="option in airlineOptions" :key="option.label" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <!-- Sort by Passenger Capacity -->
        <label class="text-sm font-medium text-black-800 mb-1"> Sort By Passenger Capacity </label>

        <select
          v-model="activeFilters['CapacitySort']"
          class="px-3 py-2 border border-neutral-100 rounded-lg bg-white-100 text-black-800 text-sm focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
        >
          <option value="desc">Highest to Lowest</option>
          <option value="asc">Lowest to Highest</option>
        </select>
      </div>
      <div class="flex flex-col">
        <!-- Sort by First Flight Date -->
        <label class="text-sm font-medium text-black-800 mb-1"> Sort By First Flight Date </label>

        <select
          v-model="activeFilters['DateSort']"
          class="px-3 py-2 border border-neutral-100 rounded-lg bg-white-100 text-black-800 text-sm focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
        >
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>
      </div>
    </div>
    <AircraftModelChartComponent
      name="Aircraft Model Distribution"
      :data="aircraftModelChartData"
    />
    <div class="overflow-x-auto rounded-lg border border-neutral-100">
      <table class="w-full border-collapse bg-white-100 text-left text-sm">
        <thead class="bg-white-200">
          <tr>
            <th class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100">
              Aircraft
            </th>
            <th class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100">
              Airline
            </th>
            <th class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100">
              Manufacturer
            </th>
            <th class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100">
              Passenger Capacity
            </th>
            <th class="px-6 py-4 font-semibold text-black-900 border-b border-neutral-100">
              First Flight Date
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
                :secondaryText="row[secondaryTextKey] as string"
                :imageURL="row[imageKey] as string"
              />
              <slot v-else :name="header" :row="row" :value="row[header]">
                {{ row[header] }}
              </slot>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="tableColumnCount" class="px-6 py-8 text-center text-black-800">
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
  <div v-else class="flex justify-center py-20">
    <p>Obteniendo aeronaves...</p>
  </div>
</template>
