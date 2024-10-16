import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/common/interface/payload.tokent.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Login method to create and return JWT
  genrateToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
