import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  async create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return await this.manufacturerService.create(createManufacturerDto);
  }

  @Get()
  async findAll() {
    return await this.manufacturerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.manufacturerService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return await this.manufacturerService.update(id, updateManufacturerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.manufacturerService.remove(id);
  }
}
