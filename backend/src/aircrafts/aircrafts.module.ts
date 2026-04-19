// Developed by Santiago Idarraga

// External Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Imports
import { Aircraft } from './entities/aircraft.entity';
import { AircraftsService } from './aircrafts.service';
import { AircraftsController } from './aircrafts.controller';
import { AirlinesModule } from '../airlines/airlines.module';
import { ManufacturersModule } from '../manufacturers/manufacturers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aircraft]),
    AirlinesModule,
    ManufacturersModule,
  ],
  controllers: [AircraftsController],
  providers: [AircraftsService],
})
export class AircraftsModule {}
