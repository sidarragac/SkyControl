import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
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

    return this.usersRepository.save(user);
  }

  async createAdmin() {
    const admin = this.usersRepository.create({
      name: 'Admin',
      email: 'admin@skycontrol.com',
      password: '123',
      role: 'admin',
    });

    return this.usersRepository.save(admin);
  }
}
