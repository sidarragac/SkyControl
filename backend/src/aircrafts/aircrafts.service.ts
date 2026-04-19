// Developed by Santiago Idarraga

// External Imports
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async create(createAircraftDto: CreateAircraftDto) {
    const existingAircraft = await this.findOneByRegistry(
      createAircraftDto.registry,
    );

    if (existingAircraft) {
      throw new ConflictException(
        `Aircraft ${createAircraftDto.registry} already exists`,
      );
    }
    const manufacturer = await this.manufacturersService.findOneById(
      createAircraftDto.manufacturerId,
    );

    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }

    if (
      createAircraftDto.airlineId &&
      !this.airlinesService.findOneById(createAircraftDto.airlineId)
    ) {
      throw new NotFoundException('Airline not found');
    }

    const aircraft = this.aircraftRepository.create(createAircraftDto);
    return await this.aircraftRepository.save(aircraft);
  }

  async findAll() {
    return await this.aircraftRepository.find();
  }

  async findOne(id: string) {
    return await this.aircraftRepository.findOneBy({ id });
  }

  async update(id: string, updateAircraftDto: UpdateAircraftDto) {
    const aircraft = await this.findOne(id);
    if (!aircraft) {
      throw new NotFoundException('Aircraft not found');
    }

    return await this.aircraftRepository.update(id, updateAircraftDto);
  }

  async remove(id: string) {
    return await this.aircraftRepository.delete(id);
  }

  private async findOneByRegistry(registry: string) {
    return await this.aircraftRepository.findOneBy({ registry });
  }
}
