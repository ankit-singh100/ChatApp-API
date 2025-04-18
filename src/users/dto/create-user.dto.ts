import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  Password: string;

  @IsString()
  @IsOptional()
  profilePic?: string;
}
