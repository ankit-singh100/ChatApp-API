import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsString()
    @IsNotEmpty()
    Password: string;
}