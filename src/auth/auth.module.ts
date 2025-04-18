import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from 'generated/prisma';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient,UsersService],
})
export class AuthModule {}
