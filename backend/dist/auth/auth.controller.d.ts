import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from "../users/entities/user.entity";
import type { UserRequestInterface } from "../interfaces/auth/UserRequestInterface";
import { UsersService } from "../users/users.service";
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: UserRequestInterface): Promise<User>;
}
