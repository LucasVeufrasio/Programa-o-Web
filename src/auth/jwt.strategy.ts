import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'seuSegredoJWT',  // igual ao do JwtModule
    });
  }

  async validate(payload: any) {
  console.log('VALIDATE JWT', payload);
  return { id: payload.sub, email: payload.email };
}
}
