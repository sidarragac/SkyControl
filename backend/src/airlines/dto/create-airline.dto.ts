// External imports
import { IsArray, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  country: string;

  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @IsUrl()
  @IsNotEmpty()
  imageURL: string;
}
