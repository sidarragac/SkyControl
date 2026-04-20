// External imports
import { DataSource } from 'typeorm';
// Internal imports
import { Aircraft } from '../aircrafts/entities/aircraft.entity';
import { Airline } from '../airlines/entities/airline.entity';
import { Manufacturer } from '../manufacturers/entities/manufacturer.entity';
import { manufacturerSeeder } from './manufacturer.seeder';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Manufacturer, Aircraft, Airline],
  synchronize: true,
});

dataSource
  .initialize()
  .then(async () => {
    console.log('Running seeders...');
    await manufacturerSeeder(dataSource);
    console.log('Seeders finished.');
    await dataSource.destroy();
  })
  .catch((error) => {
    console.error('Seeder error:', error);
    process.exit(1);
  });
