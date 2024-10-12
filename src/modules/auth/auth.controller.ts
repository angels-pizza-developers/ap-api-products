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
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { FacebookAuthGuard } from 'src/common/guards/facebook-auth.guard';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Req() req) {
    return this.authService.registerCustomer(req.body);
  }

  // Social Login (Google)
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    // Generate your own JWT
    const jwt = this.authService.login(req['user']);

    // Send JWT back to the client, e.g., in a cookie
    res.cookie('auth_token', jwt, {
      httpOnly: true,
      secure: true, // Use with HTTPS
      sameSite: 'lax',
    });

    // Redirect to frontend
    res.redirect('http://localhost:4200/home');
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
    // Generate your own JWT
    const jwt = this.authService.login(req['user']);
    // Redirect to frontend
    res.redirect('http://localhost:4200/home');
  }
}
