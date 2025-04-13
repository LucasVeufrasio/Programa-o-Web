import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUser(loginDto);
    if (!token) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return token;
  }
}
