// External imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Internal imports
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { Airline } from './entities/airline.entity';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectRepository(Airline)
    private airlinesRepository: Repository<Airline>,
  ) {}

  findAll(): Promise<Airline[]> {
    return this.airlinesRepository.find();
  }

  async findById(id: string): Promise<Airline> {
    const airline = await this.airlinesRepository.findOneBy({ id });
    if (!airline) {
      throw new NotFoundException(`Airline with id ${id} not found`);
    }
    return airline;
  }

  async create(createAirlineDto: CreateAirlineDto): Promise<Airline> {
    const airline = this.airlinesRepository.create(createAirlineDto);
    return this.airlinesRepository.save(airline);
  }

  async update(
    id: string,
    updateAirlineDto: UpdateAirlineDto,
  ): Promise<Airline> {
    const airline = await this.findById(id);
    Object.assign(airline, updateAirlineDto);
    return this.airlinesRepository.save(airline);
  }

  async remove(id: string): Promise<void> {
    const airline = await this.findById(id);
    await this.airlinesRepository.remove(airline);
  }
}
