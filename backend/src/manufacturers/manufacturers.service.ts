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

  async seed(): Promise<Manufacturer[]> {
    const seedData = [
      {
        id: '11111111-1111-4111-8111-111111111111',
        name: 'Boeing',
        country: 'US',
        foundationDate: new Date('1916-07-15'),
        imageUrl:
          'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
      },
      {
        id: '22222222-2222-4222-8222-222222222222',
        name: 'Airbus',
        country: 'FR',
        foundationDate: new Date('1970-12-18'),
        imageUrl:
          'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
      },
      {
        id: '33333333-3333-4333-8333-333333333333',
        name: 'Embraer',
        country: 'BR',
        foundationDate: new Date('1969-08-19'),
        imageUrl:
          'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
      },
      {
        id: '44444444-4444-4444-8444-444444444444',
        name: 'Bombardier',
        country: 'CA',
        foundationDate: new Date('1942-09-16'),
        imageUrl:
          'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
      },
      {
        id: '55555555-5555-4555-8555-555555555555',
        name: 'COMAC',
        country: 'CN',
        foundationDate: new Date('2008-05-11'),
        imageUrl:
          'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
      },
    ];

    const results: Manufacturer[] = [];

    for (const data of seedData) {
      const existing = await this.manufacturerRepository.findOneBy({
        id: data.id,
      });
      if (!existing) {
        const manufacturer = this.manufacturerRepository.create(data);
        results.push(await this.manufacturerRepository.save(manufacturer));
      }
    }

    return results;
  }
}
