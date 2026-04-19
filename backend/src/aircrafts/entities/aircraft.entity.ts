// Developed by Santiago Idarraga

// External Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Internal Imports
import { Airline } from '../../airlines/entities/airline.entity';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { Status } from '../../types/AircraftsTypes';

@Entity()
export class Aircraft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  registry: string;

  @Column({ type: 'varchar', length: 100 })
  model: string;

  @Column({ type: 'int' })
  passengerCapacity: number;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'date' })
  firstFlightDate: Date;

  @Column({ type: 'varchar' })
  imageURL: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Airline, (airline) => airline.aircrafts, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
  })
  airline: string;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.aircrafts, {
    eager: true,
  })
  @JoinColumn({
    referencedColumnName: 'id',
  })
  manufacturer: string;
}
