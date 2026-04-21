import { Repository } from 'typeorm';
import { Airline } from './entities/airline.entity';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
export declare class AirlinesService {
    private airlinesRepository;
    constructor(airlinesRepository: Repository<Airline>);
    findAll(): Promise<Airline[]>;
    findById(id: string): Promise<Airline>;
    create(createAirlineDto: CreateAirlineDto): Promise<Airline>;
    update(id: string, updateAirlineDto: UpdateAirlineDto): Promise<Airline>;
    remove(id: string): Promise<void>;
}
