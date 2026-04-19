// External imports
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Internal Imports
import { Aircraft } from 'src/aircrafts/entities/aircraft.entity';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  country: string;

  @Column({ type: 'simple-array', nullable: true })
  destinations: string[];

  @Column({ type: 'varchar', nullable: true })
  imageURL: string;

  @OneToMany('Aircraft', 'airline')
  aircrafts: Aircraft[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
