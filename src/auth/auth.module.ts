import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module'; // <- ESSE AQUI!
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // <- INCLUI AQUI!
    PassportModule,
    JwtModule.register({
      secret: 'secretao123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
