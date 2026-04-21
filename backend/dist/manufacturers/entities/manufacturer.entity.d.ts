import { Aircraft } from '../../aircrafts/entities/aircraft.entity';
export declare class Manufacturer {
    id: string;
    name: string;
    country: string;
    foundationDate: Date;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
    aircrafts: Aircraft[];
}
