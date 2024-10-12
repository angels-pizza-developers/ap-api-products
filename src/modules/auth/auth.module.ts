import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/service/user.service';
import { ProfileCustomerService } from '../user/service/profile-customer.service';
import { ProfileCorporateService } from '../user/service/profile-corporate.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileCustomer } from 'src/database/entities/ProfileCustomer';
import { ProfileCorporate } from '../../database/entities/ProfileCorporate';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { AutoMapperModule } from 'src/common/auto-mapper/auto-mapper.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AutoMapperModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecret'),  // Fetch secret from environment variable
        signOptions: { expiresIn: '60m' },
      }),
    }),
    TypeOrmModule.forFeature([User, ProfileCustomer, ProfileCorporate]), // Register product entity and repository
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ProfileCustomerService,
    ProfileCorporateService,
    JwtService,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
