// Developed by Santiago Idarraga

// External Imports
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

// Internal Imports
import { Aircraft } from './entities/aircraft.entity';
import { AirlinesService } from '../airlines/airlines.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';

@Injectable()
export class AircraftsService {
  constructor(
    @InjectRepository(Aircraft)
    private readonly aircraftRepository: Repository<Aircraft>,
    private readonly manufacturersService: ManufacturersService,
    private readonly airlinesService: AirlinesService,
  ) {}

  async create(createAircraftDto: CreateAircraftDto): Promise<Aircraft> {
    const existingAircraft = await this.findOneByRegistry(
      createAircraftDto.registry,
    );

    if (existingAircraft) {
      throw new ConflictException(
        `Aircraft ${createAircraftDto.registry} already exists`,
      );
    }
    const manufacturer = await this.manufacturersService.findOneById(
      createAircraftDto.manufacturer,
    );

    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }

    if (
      createAircraftDto.airline &&
      !this.airlinesService.findOneById(createAircraftDto.airline)
    ) {
      throw new NotFoundException('Airline not found');
    }

    const aircraft = this.aircraftRepository.create(createAircraftDto);
    return await this.aircraftRepository.save(aircraft);
  }

  async findAll(): Promise<Aircraft[]> {
    return await this.aircraftRepository.find();
  }

  async findOne(id: string): Promise<Aircraft | null> {
    return await this.aircraftRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateAircraftDto: UpdateAircraftDto,
  ): Promise<UpdateResult> {
    const aircraft = await this.findOne(id);
    if (!aircraft) {
      throw new NotFoundException('Aircraft not found');
    }

    return await this.aircraftRepository.update(id, updateAircraftDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.aircraftRepository.delete(id);
  }

  private async findOneByRegistry(registry: string): Promise<Aircraft | null> {
    return await this.aircraftRepository.findOneBy({ registry });
  }
}
