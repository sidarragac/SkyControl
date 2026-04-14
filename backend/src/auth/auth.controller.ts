// External imports
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

// Internal imports
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserOutputDto } from '../users/dto/user-output.dto';
import type { UserRequestInterface } from 'src/interfaces/auth/UserRequestInterface';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req: UserRequestInterface,
  ): Promise<UserOutputDto> {
    const user = await this.usersService.findById(req.user.sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userOutputDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userOutputDto;
  }
}
