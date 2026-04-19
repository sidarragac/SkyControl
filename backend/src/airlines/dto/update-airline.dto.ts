// Internal imports
import { CreateAirlineDto } from './create-airline.dto';

export class UpdateAirlineDto implements Partial<CreateAirlineDto> {
  name?: string;
  country?: string;
  destinations?: string[];
  imageURL?: string;
}
