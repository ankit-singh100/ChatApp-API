import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Res({passthrough: true}) res: Response , @Body() registerDto: RegisterDto) {
    // return this.authService.register(registerDto);
    const token = await this.authService.register(registerDto);

    //set token as cookies
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      });

      return { message:'User registered successfully' };
  }

  @Post('login')
  async login(@Res({passthrough: true}) res: Response, @Body() loginDto: RegisterDto) {
    // return this.authService.login(loginDto);

    const token = await this.authService.login(loginDto);

    //set token as cookies
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      });

      
      return { message: 'User logged in successfully' };
  }
}
