// Developed by Santiago Idárraga

// External imports
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Internal imports
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const existingManufacturer = await this.findOneByName(
      createManufacturerDto.name,
    );

    if (existingManufacturer) {
      throw new ConflictException(
        `Manufacturer ${createManufacturerDto.name} already exists`,
      );
    }

    return await this.manufacturerRepository.save(createManufacturerDto);
  }

  async findAll(): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.find();
  }

  async findById(id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOneBy({ id });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer ${id} not found`);
    }

    return manufacturer;
  }

  async update(
    id: string,
    updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<UpdateResult> {
    const manufacturer = await this.findById(id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer ${id} not found`);
    }

    return await this.manufacturerRepository.update(id, updateManufacturerDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    const manufacturer = await this.findById(id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer ${id} not found`);
    }

    return await this.manufacturerRepository.delete(id);
  }

  private async findOneByName(name: string): Promise<Manufacturer | null> {
    return await this.manufacturerRepository.findOneBy({ name });
  }
}
