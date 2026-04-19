// External imports
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal imports
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
