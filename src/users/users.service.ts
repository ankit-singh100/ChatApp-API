import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from 'generated/prisma';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createUserDto: CreateUserDto) {
    await this.checkIfEmailExists(createUserDto.Email);
    createUserDto.Password = await hash(createUserDto.Password, 10);
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id);

    if (updateUserDto.Email) {
      await this.checkIfEmailExists(updateUserDto.Email, id);
    }

    if (updateUserDto.Password && user.Password !== updateUserDto.Password) {
      updateUserDto.Password = await hash(updateUserDto.Password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(updateUserDto.profilePic && {
          profilePic: updateUserDto.profilePic,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.getUser(id);
    return this.prisma.user.delete({ where: { id } });
  }

  private async getUser(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async checkIfEmailExists(Email: string, id?: number) {
    const doesEmailExist = await this.prisma.user.findFirst({
      where: { Email },
    });
    if (doesEmailExist) {
      if (id && doesEmailExist.id !== id) {
        throw new BadRequestException(`User with ${Email} already exists`);
      } else if (!id) {
        throw new BadRequestException(`User with ${Email} already exists`);
      }
    }
  }
}
