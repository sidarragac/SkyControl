// Developed by Santiago Idarraga

// External Imports
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal Imports
import { Airline } from '../../airlines/entities/airline.entity';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import type { Status } from '../../types/AircraftsTypes';

export class CreateAircraftDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  registry: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  model: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  passengerCapacity: number;

  @IsString()
  status: Status;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  firstFlightDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageURL: string;

  @IsOptional()
  @IsUUID('4')
  airline: Airline;

  @IsNotEmpty()
  @IsUUID('4')
  manufacturer: Manufacturer;
}
