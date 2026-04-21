import { Aircraft } from "../../aircrafts/entities/aircraft.entity";
export declare class Airline {
    id: string;
    name: string;
    country: string;
    destinations: string[];
    imageURL: string;
    aircrafts: Aircraft[];
    createdAt: Date;
    updatedAt: Date;
}
