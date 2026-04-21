import { Aircraft } from '../../aircrafts/entities/aircraft.entity';
export declare class CreateManufacturerDto {
    name: string;
    country: string;
    foundationDate: Date;
    imageURL: string;
    aircrafts?: Aircraft[];
}
