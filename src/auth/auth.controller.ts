import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/helpers/public';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }

    // @Public()
    // @Post('update-profile')
    // async updateProfile(@Body() updateProfileDto: CreateUserDto) {
    //   return this.authService.updateProfile(updateProfileDto);
    // }
}
