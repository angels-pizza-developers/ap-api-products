import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacebookAuthGuard } from 'src/common/guards/facebook-auth.guard';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { Request, Response } from 'express';
import { AuthService } from './service/auth.service';
import { ApiResponseModel } from 'src/common/models/api-response.model';
import { ConfigService } from '@nestjs/config';
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from 'src/shared/constants/api-response.constant';
import { LogInDto } from './dto/login.dto';
import { RegisterCustomerUserDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // Social Login (Google)
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    if (!req['authInfo'] || !req['user']) {
      console.log(req['authInfo']);
      res.redirect(
        `${this.configService.get<string>('AUTH_CLIENT_ERROR_CALL_BACK')}?auth=google&error=NOT_LINKED`,
      );
    } else {
      // Generate your own JWT
      const access_token = await this.authService.oauthGenerateToken(
        req['user'],
      );

      // Send JWT back to the client, e.g., in a cookie
      res.cookie('auth_token', access_token, {
        httpOnly: true,
        secure: true, // Use with HTTPS
        sameSite: 'lax',
      });

      // Redirect to frontend
      res.redirect(
        this.configService.get<string>('AUTH_CLIENT_SUCCESS_CALL_BACK'),
      );
    }
  }

  // Social Login (Facebook)
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin() {
    // Initiates the Facebook login flow
  }

  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
    if (!req['authInfo'] || !req['user']) {
      console.log(req['authInfo']);
      res.redirect(
        `${this.configService.get<string>('AUTH_CLIENT_ERROR_CALL_BACK')}?auth=facebook&error=NOT_LINKED`,
      );
    } else {
      // Generate your own JWT
      const access_token = await this.authService.oauthGenerateToken(
        req['user'],
      );

      // Send JWT back to the client, e.g., in a cookie
      res.cookie('auth_token', access_token, {
        httpOnly: true,
        secure: true, // Use with HTTPS
        sameSite: 'lax',
      });

      // Redirect to frontend
      res.redirect(
        this.configService.get<string>('AUTH_CLIENT_SUCCESS_CALL_BACK'),
      );
    }
  }

  @Post('login_customer')
  public async loginCustomer(
    @Body()
    dto: LogInDto,
  ) {
    const res: ApiResponseModel<any> = {} as any;
    try {
      res.data = await this.authService.loginCustomer(dto);
      res.success = true;
      res.message = LOGIN_SUCCESS;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post('register_customer')
  public async registerCustomer(
    @Body()
    dto: RegisterCustomerUserDto,
  ) {
    const res: ApiResponseModel<any> = {} as any;
    try {
      res.data = await this.authService.registerCustomer(dto);
      res.success = true;
      res.message = REGISTER_SUCCESS;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
