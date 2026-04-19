// Developed by Santiago Idárraga

// External imports
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
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

  async findAll() {
    return await this.manufacturerRepository.find();
  }

  async findOneById(id: string) {
    const manufacturer = await this.manufacturerRepository.findOneBy({ id });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer ${id} not found`);
    }

    return manufacturer;
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    const manufacturer = await this.findOneById(id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer ${id} not found`);
    }

    return await this.manufacturerRepository.update(id, updateManufacturerDto);
  }

  async remove(id: string) {
    const manufacturer = await this.findOneById(id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer ${id} not found`);
    }

    return await this.manufacturerRepository.delete(id);
  }

  private async findOneByName(name: string) {
    return await this.manufacturerRepository.findOneBy({ name });
  }
}
