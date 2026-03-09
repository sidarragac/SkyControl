// Developed by Mateo Pineda, Santiago Idárraga
// External imports
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

// Internal imports
import type { CreateAircraftDTO } from '@/dtos/CreateAircraftDTO';
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { UpdateAircraftDTO } from '@/dtos/UpdateAircraftDTO';
import { useAircraftStore } from '@/stores/AircraftStore';
import { useAirlineStore } from '@/stores/AirlineStore';

interface RecentActivityItem {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}

export class AircraftService {
  static getAircrafts(): AircraftInterface[] {
    return useAircraftStore().aircrafts;
  }

  static createAircraft(aircraft: CreateAircraftDTO): void {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    useAircraftStore().aircrafts.push({ id, ...aircraft, createdAt, updatedAt });
  }

  static updateAircraft(updatedAircraft: UpdateAircraftDTO): void {
    const index = useAircraftStore().aircrafts.findIndex(
      (aircraft) => aircraft.id === updatedAircraft.id,
    );
    if (index === -1) {
      throw new Error('Aircraft not found');
    }
    useAircraftStore().aircrafts[index] = {
      ...updatedAircraft,
      updatedAt: new Date().toISOString(),
    };
  }

  static deleteAircraft(id: string): void {
    const index = useAircraftStore().aircrafts.findIndex((aircraft) => aircraft.id === id);
    if (index === -1) {
      throw new Error('Aircraft not found');
    }
    useAircraftStore().aircrafts.splice(index, 1);
  }

  static getAircraftsByAirlineId(airlineId: string): AircraftInterface[] {
    return useAircraftStore().aircrafts.filter((aircraft) => aircraft.airlineId === airlineId);
  }

  static getTotalAircrafts(): ComputedRef<number> {
    const store = useAircraftStore();
    return computed(() => store.aircrafts.length);
  }

  static getFleetHealth(): ComputedRef<number> {
    const store = useAircraftStore();
    return computed(() => {
      const total = store.aircrafts.length;
      if (total === 0) return 0;
      const active = store.aircrafts.filter((a) => a.status === 'active').length;
      return Math.round((active / total) * 100 * 10) / 10;
    });
  }

  static getRecentActivity(): ComputedRef<RecentActivityItem[]> {
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
  }
}
