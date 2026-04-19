// External imports
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('The email address is already in use');
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      role: 'user',
    });

    return await this.usersRepository.save(user);
  }

  async createAdmin(): Promise<User> {
    const admin = this.usersRepository.create({
      name: 'Admin',
      email: 'admin@skycontrol.com',
      password: '123',
      role: 'admin',
    });

    return await this.usersRepository.save(admin);
  }
}
