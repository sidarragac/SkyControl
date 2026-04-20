// Developed by Santiago Idarraga

// External Imports
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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
    console.log('Create DTO:', createAircraftDto);
    const { manufacturerId, airlineId, ...aircraftData } = createAircraftDto;
    const existingAircraft = await this.findOneByRegistry(
      aircraftData.registry,
    );

    if (existingAircraft) {
      throw new ConflictException(
        `Aircraft ${aircraftData.registry} already exists`,
      );
    }

    const manufacturer =
      await this.manufacturersService.findById(manufacturerId);

    const airline = await this.airlinesService.findById(airlineId);

    const aircraft = this.aircraftRepository.create({
      ...aircraftData,
      airline,
      manufacturer,
    });
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
  ): Promise<Aircraft> {
    console.log('Update DTO:', updateAircraftDto);
    const { manufacturerId, airlineId, ...aircraftData } = updateAircraftDto;
    const aircraft = await this.aircraftRepository.preload({
      id,
      ...aircraftData,
    });

    if (!aircraft) {
      throw new NotFoundException(`Aircraft with id ${id} not found`);
    }

    if (airlineId) {
      const airline = await this.airlinesService.findById(airlineId);
      aircraft.airline = airline;
    }

    if (manufacturerId) {
      const manufacturer =
        await this.manufacturersService.findById(manufacturerId);
      aircraft.manufacturer = manufacturer;
    }

    return await this.aircraftRepository.save(aircraft);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.aircraftRepository.delete(id);
  }

  private async findOneByRegistry(registry: string): Promise<Aircraft | null> {
    return await this.aircraftRepository.findOneBy({ registry });
  }
}
