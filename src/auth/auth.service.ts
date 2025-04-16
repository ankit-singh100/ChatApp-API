import {
  BadRequestException,
  Body,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from 'generated/prisma';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userEmailExist = await this.prisma.user.findUnique({
      where: { Email: registerDto.Email },
    });

    if (userEmailExist) {
      throw new BadRequestException(`${registerDto.Email} already exists`);
    }

    registerDto.Password = await hash(registerDto.Password, 10);

    const user = await this.prisma.user.create({
      data: { ...registerDto },
    });

    const token = await this.jwtService.signAsync({
      userId: user.id,
    });
    
    return { token };
  }

  async login(@Body() loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { Email: loginDto.Name },
    });
    if (!user) {
      throw new BadRequestException(`${loginDto.Name} not found`);
    }
    if (!(await compare(loginDto.Password, user.Password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await this.jwtService.signAsync({
      user_id: user.id,
    });
    return { token };
  }
}
