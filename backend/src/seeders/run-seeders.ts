// External imports
import { NestFactory } from '@nestjs/core';
// Internal imports
import { AppModule } from '../app.module';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
import { manufacturerSeeder } from './manufacturer.seeder';

async function runSeeders() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const manufacturersService = app.get(ManufacturersService);

  console.log('Running seeders...');

  for (const data of manufacturerSeeder) {
    try {
      await manufacturersService.create(data);
      console.log(`Created: ${data.name}`);
    } catch {
      console.log(`Skipped (already exists): ${data.name}`);
    }
  }

  console.log('Seeders finished.');
  await app.close();
}

void runSeeders();
