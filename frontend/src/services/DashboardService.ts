// Developed by Juan Jara

// External imports
import { computed } from 'vue';

// Internal imports
import { useAircraftStore } from '@/stores/AircraftStore';
import { useAirlineStore } from '@/stores/AirlineStore';
import { useManufacturerStore } from '@/stores/ManufacturerStore';

export const DashboardService = {
  getTotalAircrafts() {
    const store = useAircraftStore();
    return computed(() => store.aircrafts.length);
  },

  getActiveAirlinesCount() {
    const store = useAirlineStore();
    return computed(() => store.airlines.length);
  },

  getManufacturersCount() {
    const store = useManufacturerStore();
    return computed(() => store.manufacturers.length);
  },

  getFleetHealth() {
    const store = useAircraftStore();
    return computed(() => {
      const total = store.aircrafts.length;
      if (total === 0) return 0;
      const active = store.aircrafts.filter((a) => a.status === 'active').length;
      return Math.round((active / total) * 100 * 10) / 10;
    });
  },

  getTopManufacturers() {
    const aircraftStore = useAircraftStore();
    const manufacturerStore = useManufacturerStore();

    return computed(() => {
      const counts: Record<string, { name: string; count: number }> = {};

      aircraftStore.aircrafts.forEach((aircraft) => {
        const manufacturer = manufacturerStore.manufacturers.find(
          (m) => m.id === aircraft.manufacturerId,
        );

        if (!manufacturer) return;

        let entry = counts[manufacturer.id];

        if (!entry) {
          entry = counts[manufacturer.id] = {
            name: manufacturer.name,
            count: 0,
          };
        }

        entry.count++;
      });

      return Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);
    });
  },

  getRecentActivity() {
    const aircraftStore = useAircraftStore();
    const airlineStore = useAirlineStore();
    return computed(() => {
      return [...aircraftStore.aircrafts]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4)
        .map((aircraft) => {
          const airline = airlineStore.airlines.find((al) => al.id === aircraft.airlineId);
          const updatedAt = new Date(aircraft.updatedAt);
          const createdAt = new Date(aircraft.createdAt);
          const isNew = updatedAt.getTime() === createdAt.getTime();
          const diffMs = Date.now() - updatedAt.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);

          let timeLabel = '';
          if (diffMins < 60) timeLabel = `${diffMins} minutes ago`;
          else if (diffHours < 24) timeLabel = `${diffHours} hours ago`;
          else timeLabel = `${Math.floor(diffHours / 24)} days ago`;

          return {
            id: aircraft.id,
            icon: isNew ? 'fa-plus' : 'fa-wrench',
            iconBg: isNew ? 'bg-accent-500/20' : 'bg-primary-700',
            iconColor: isNew ? 'text-accent-500' : 'text-neutral-100/70',
            title: aircraft.model,
            subtitle: `${isNew ? 'added to' : 'updated in'} ${airline?.name ?? 'Unknown'} • ${aircraft.registry}`,
            time: timeLabel,
          };
        });
    });
  },
};
