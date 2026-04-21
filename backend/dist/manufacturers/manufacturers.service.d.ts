import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturersService {
    private readonly manufacturerRepository;
    constructor(manufacturerRepository: Repository<Manufacturer>);
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    findAll(): Promise<Manufacturer[]>;
    findById(id: string): Promise<Manufacturer>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
    private findOneByName;
}
