// External imports
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

// Internal imports
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Post()
  async create(
    @Body() createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    return await this.manufacturersService.create(createManufacturerDto);
  }

  @Get()
  async findAll(): Promise<Manufacturer[]> {
    return await this.manufacturersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Manufacturer> {
    return await this.manufacturersService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<UpdateResult> {
    return await this.manufacturersService.update(id, updateManufacturerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.manufacturersService.remove(id);
  }
}
