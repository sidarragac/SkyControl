<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import { AircraftService } from '@/services/AircraftService';
import AircraftModelChartComponent from '@/components/charts/AircraftModelChartComponent.vue';
import { AirlineService } from '@/services/AirlineService';
import DataTableComponent from '@/components/DataTableComponent.vue';
import FilterBarComponent from '@/components/FilterBarComponent.vue';
import { ManufacturerService } from '@/services/ManufacturerService';

// Non-reactive Variables
const aircrafts = AircraftService.getAircrafts();
const tableHeaders = [
  'Aircraft',
  'Airline',
  'Manufacturer',
  'Passenger Capacity',
  'First Flight Date',
];

// Reactive Variables
const activeFilters = ref<Record<string, string | number>>({});

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
      AirlineId: aircraft.airlineId,
      Manufacturer:
        ManufacturerService.getManufacturerById(aircraft.manufacturerId)?.name || 'Unknown',
      ManufacturerId: aircraft.manufacturerId,
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
        return row[key] === value;
      }

      if (key === 'Airline') {
        return row[key] === value;
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

const filtersConfig = computed(() => [
  {
    label: 'Manufacturer',
    key: 'Manufacturer',
    options: manufacturerOptions.value,
  },
  {
    label: 'Airline',
    key: 'Airline',
    options: airlineOptions.value,
  },
  {
    label: 'Sort by Passenger Capacity',
    key: 'CapacitySort',
    options: [
      { label: 'Highest to Lowest', value: 'desc' },
      { label: 'Lowest to Highest', value: 'asc' },
    ],
  },
  {
    label: 'Sort by First Flight Date',
    key: 'DateSort',
    options: [
      { label: 'Newest to Oldest', value: 'desc' },
      { label: 'Oldest to Newest', value: 'asc' },
    ],
  },
]);

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
</script>
<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Aircraft Information</h2>
      <p>Get to know some of the most representative aircrafts in the world</p>
    </header>
    <FilterBarComponent :filters="filtersConfig" @update:filters="activeFilters = $event" />
    <AircraftModelChartComponent
      name="Aircraft Model Distribution"
      :data="aircraftModelChartData"
    />
    <DataTableComponent
      :headers="tableHeaders"
      :data="filteredTableData"
      :useDisplayInFirstColumn="true"
      mainTextKey="Registry"
      secondaryTextKey="Model"
      imageKey="ImageURL"
    />
  </div>
</template>
