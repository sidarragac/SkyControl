import { DeleteResult, Repository } from 'typeorm';
import { Aircraft } from './entities/aircraft.entity';
import { AirlinesService } from '../airlines/airlines.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
export declare class AircraftsService {
    private readonly aircraftRepository;
    private readonly manufacturersService;
    private readonly airlinesService;
    constructor(aircraftRepository: Repository<Aircraft>, manufacturersService: ManufacturersService, airlinesService: AirlinesService);
    create(createAircraftDto: CreateAircraftDto): Promise<Aircraft>;
    findAll(): Promise<Aircraft[]>;
    findOne(id: string): Promise<Aircraft | null>;
    update(id: string, updateAircraftDto: UpdateAircraftDto): Promise<Aircraft>;
    remove(id: string): Promise<DeleteResult>;
    private findOneByRegistry;
}
