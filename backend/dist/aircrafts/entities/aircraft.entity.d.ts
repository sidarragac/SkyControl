import { Airline } from '../../airlines/entities/airline.entity';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import type { Status } from '../../types/AircraftsTypes';
export declare class Aircraft {
    id: string;
    registry: string;
    model: string;
    passengerCapacity: number;
    status: Status;
    firstFlightDate: Date;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
    airline: Airline;
    manufacturer: Manufacturer;
}
