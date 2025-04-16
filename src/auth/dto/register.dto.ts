import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{

    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsString()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty()   
    Password: string;

}