// External Imports
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

// Internal Imports
import { Aircraft } from './entities/aircraft.entity';
import { AircraftsService } from './aircrafts.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';

@Controller('aircrafts')
export class AircraftsController {
  constructor(private readonly aircraftsService: AircraftsService) {}

  @Post()
  create(@Body() createAircraftDto: CreateAircraftDto): Promise<Aircraft> {
    return this.aircraftsService.create(createAircraftDto);
  }

  @Get()
  findAll(): Promise<Aircraft[]> {
    return this.aircraftsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Aircraft | null> {
    return await this.aircraftsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAircraftDto: UpdateAircraftDto,
  ): Promise<UpdateResult> {
    return await this.aircraftsService.update(id, updateAircraftDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.aircraftsService.remove(id);
  }
}
