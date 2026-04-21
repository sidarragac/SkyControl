import { Airline } from './entities/airline.entity';
import { AirlinesService } from './airlines.service';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
export declare class AirlinesController {
    private readonly airlinesService;
    constructor(airlinesService: AirlinesService);
    findAll(): Promise<Airline[]>;
    findById(id: string): Promise<Airline>;
    create(createAirlineDto: CreateAirlineDto): Promise<Airline>;
    update(id: string, updateAirlineDto: UpdateAirlineDto): Promise<Airline>;
    remove(id: string): Promise<void>;
}
