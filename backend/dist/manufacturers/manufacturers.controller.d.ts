import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturersController {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    findAll(): Promise<Manufacturer[]>;
    findOne(id: string): Promise<Manufacturer>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
