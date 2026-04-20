// External imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  // UseGuards,
} from '@nestjs/common';

// Internal imports
import { Airline } from './entities/airline.entity';
import { AirlinesService } from './airlines.service';
// import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';

// @UseGuards(AuthGuard)
@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @Get()
  async findAll(): Promise<Airline[]> {
    return await this.airlinesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Airline> {
    return await this.airlinesService.findById(id);
  }

  @Post()
  async create(@Body() createAirlineDto: CreateAirlineDto): Promise<Airline> {
    return await this.airlinesService.create(createAirlineDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAirlineDto: UpdateAirlineDto,
  ): Promise<Airline> {
    return await this.airlinesService.update(id, updateAirlineDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.airlinesService.remove(id);
  }
}
