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
// import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { Email: registerDto.Email },
      });

      if (existingUser) {
        throw new BadRequestException(`${registerDto.Email} already exists`);
      }

      const user = await this.userService.create(registerDto);

      registerDto.Password = await hash(registerDto.Password, 10);

      const token = await this.jwtService.signAsync({
        user_id: user.id,
      });

      return { token };
    } catch (err) {
      console.log(err);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { Email: loginDto.Name },
    });

    if (!user) {
      throw new UnauthorizedException(`User not found`);
    }

    if (!compare(loginDto.Password, user.Password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      user_id: user.id,
    });

    return { token };
  }

  // async updateProfile(updateProfileDto: any) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id: updateProfileDto.id },
  //   });

  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }

  //   const uploadResponse = await cloudinary.uploader.upload(
  //     updateProfileDto.profilePic,
  //   );

  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: updateProfileDto.id },
  //     data: {
  //       profilePic: uploadResponse.secure_url, // Use the secure URL from Cloudinary
  //     },
  //   });

  //   return updatedUser;
  // }
}
