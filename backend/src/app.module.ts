// External imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal imports
import { AircraftsModule } from './aircrafts/aircrafts.module';
import { AirlinesModule } from './airlines/airlines.module';
import { AuthModule } from './auth/auth.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AircraftsModule,
    AuthModule,
    AirlinesModule,
    UsersModule,
    ManufacturersModule,
  ],
})
export class AppModule {}
