import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const users = await this.userService.findAll();
    const user = users.find(u => u.email === loginDto.email);

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    return null;
  }
}
