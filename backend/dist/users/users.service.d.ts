import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<User>;
    createAdmin(): Promise<User>;
}
