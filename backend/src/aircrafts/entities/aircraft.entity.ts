// Developed by Santiago Idarraga

// External Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Internal Imports
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

  @Column({ type: 'uuid', nullable: true })
  airlineId: string;

  @Column({ type: 'uuid' })
  manufacturerId: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
