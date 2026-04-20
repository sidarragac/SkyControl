// Developed by Santiago Idárraga

// External imports
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsArray,
  IsUrl,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal imports
import { Aircraft } from '../../aircrafts/entities/aircraft.entity';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  country: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  foundationDate: Date;

  @IsNotEmpty()
  @IsString()
  imageURL: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aircrafts?: Aircraft[];
}
