import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<User>;
    createAdmin(): Promise<User>;
}
