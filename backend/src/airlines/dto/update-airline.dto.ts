// Internal imports
import { PartialType } from '@nestjs/mapped-types';
import { CreateAirlineDto } from './create-airline.dto';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export class UpdateAirlineDto extends PartialType(CreateAirlineDto) {}
