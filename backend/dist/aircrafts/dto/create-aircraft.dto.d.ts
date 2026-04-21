import type { Status } from '../../types/AircraftsTypes';
export declare class CreateAircraftDto {
    registry: string;
    model: string;
    passengerCapacity: number;
    status: Status;
    firstFlightDate: Date;
    imageURL: string;
    airlineId: string;
    manufacturerId: string;
}
