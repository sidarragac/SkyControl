// External imports
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Internal imports
import { Aircraft } from '../../aircrafts/entities/aircraft.entity';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 2 })
  country: string;

  @Column({ type: 'date' })
  foundationDate: Date;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => Aircraft, (aircraft) => aircraft.manufacturer)
  @JoinColumn({
    referencedColumnName: 'id',
  })
  aircrafts: Aircraft[];
}
