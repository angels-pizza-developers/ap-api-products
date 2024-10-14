/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { RegisterCustomerDto } from './dto/register.dto';
import { UserService } from '../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/User';
import { Connection } from 'typeorm';
import { ProfileCustomerService } from '../user/service/profile-customer.service';
import { ProfileCorporateService } from '../user/service/profile-corporate.service';
import { plainToInstance } from 'class-transformer';
import { CreateProfileCustomerDto } from '../user/dto/create-profile-customer.dto';
import { CreateProfileCorporateDto } from '../user/dto/create-profile-corporate.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // Inject UsersService here
    private readonly profileCustomerService: ProfileCustomerService, // Inject UsersService here
    private readonly profileCorporateService: ProfileCorporateService, // Inject UsersService here
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Login method to create and return JWT
  login(user: User) {
    const payload: any = {
      userId: user.userId,
      sub: user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async registerCustomer(dto: RegisterCustomerDto) {
    return await this.connection.manager.transaction(async (entityManager) => {
      try {
        let user: User, profile;
        user = await this.userService.create(
          plainToInstance(CreateUserDto, dto),
          entityManager,
        );
        if (!user) {
          throw Error('Error saving user!');
        }
        profile = await this.profileCustomerService.create(
          plainToInstance(CreateProfileCustomerDto, dto),
          entityManager,
        );
        if (!profile) {
          throw Error('Error saving profile!');
        }

        console.log(user);

        // Commit transaction
        return user;
      } catch (ex) {
        if (
          ex['message'] &&
          (ex['message'].includes('duplicate key') ||
            ex['message'].includes('violates unique constraint')) &&
          ex['message'].includes('u_user')
        ) {
          throw Error('Username already used!');
        } else if (
          ex['message'] &&
          (ex['message'].includes('duplicate key') ||
            ex['message'].includes('violates unique constraint')) &&
          ex['message'].includes('u_parents_number')
        ) {
          throw Error('Number already used!');
        } else {
          throw ex;
        }
      }
    });
  }

  findByEmail(email) {
    return this.userService.findByEmail(email);
  }

  findByFacebookUser(id) {
    return this.userService.findByUsername(id);
  }
}
