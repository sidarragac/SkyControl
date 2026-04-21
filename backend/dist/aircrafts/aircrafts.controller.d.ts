import { DeleteResult } from 'typeorm';
import { Aircraft } from './entities/aircraft.entity';
import { AircraftsService } from './aircrafts.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
export declare class AircraftsController {
    private readonly aircraftsService;
    constructor(aircraftsService: AircraftsService);
    create(createAircraftDto: CreateAircraftDto): Promise<Aircraft>;
    findAll(): Promise<Aircraft[]>;
    findOne(id: string): Promise<Aircraft | null>;
    update(id: string, updateAircraftDto: UpdateAircraftDto): Promise<Aircraft>;
    remove(id: string): Promise<DeleteResult>;
}
