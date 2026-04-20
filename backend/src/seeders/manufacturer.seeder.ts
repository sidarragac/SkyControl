// Internal imports
import type { CreateManufacturerDto } from '../manufacturers/dto/create-manufacturer.dto';

export const manufacturerSeeder: CreateManufacturerDto[] = [
  {
    name: 'Boeing',
    country: 'US',
    foundationDate: new Date('1916-07-15'),
    imageUrl:
      'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
  },
  {
    name: 'Airbus',
    country: 'FR',
    foundationDate: new Date('1970-12-18'),
    imageUrl:
      'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
  },
  {
    name: 'Embraer',
    country: 'BR',
    foundationDate: new Date('1969-08-19'),
    imageUrl:
      'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
  },
  {
    name: 'Bombardier',
    country: 'CA',
    foundationDate: new Date('1942-09-16'),
    imageUrl:
      'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
  },
  {
    name: 'COMAC',
    country: 'CN',
    foundationDate: new Date('2008-05-11'),
    imageUrl:
      'https://image.cnbcfm.com/api/v1/image/108155304-241205-cn-23-tech-airplane-maintenance-v500_00_46_04Still005.png?v=1749137575&w=750&h=422&vtcrop=y',
  },
];
