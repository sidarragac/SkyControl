// Developed by Santiago Idárraga

// External imports
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsString()
  imageUrl: string;
}
