import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class LogInDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  
  @ApiProperty()
  @IsOptional()
  @IsIn([
    'PASSWORD',
    'PIN',
    'PASSWORDLESS',
    'OTP',
    'GOOGLE',
    'FACEBOOK',
    'APPLE',
    'GITHUB',
    'LINKEDIN',
    'SSO',
    'SAML',
    'OAUTH2',
    'OPENID_CONNECT',
    'AZURE_AD',
    'OKTA',
    'FINGERPRINT',
    'FACE_RECOGNITION',
    'VOICE_RECOGNITION',
    '2FA_SMS',
    '2FA_EMAIL',
    '2FA_AUTH_APP',
    '2FA_HARDWARE_TOKEN',
    'MAGIC_LINK',
    'TOKEN',
    'QR_CODE',
    'GUEST',
  ])
  authMethod:
    | 'PASSWORD'
    | 'PIN'
    | 'PASSWORDLESS'
    | 'OTP'
    | 'GOOGLE'
    | 'FACEBOOK'
    | 'APPLE'
    | 'GITHUB'
    | 'LINKEDIN'
    | 'SSO'
    | 'SAML'
    | 'OAUTH2'
    | 'OPENID_CONNECT'
    | 'AZURE_AD'
    | 'OKTA'
    | 'FINGERPRINT'
    | 'FACE_RECOGNITION'
    | 'VOICE_RECOGNITION'
    | '2FA_SMS'
    | '2FA_EMAIL'
    | '2FA_AUTH_APP'
    | '2FA_HARDWARE_TOKEN'
    | 'MAGIC_LINK'
    | 'TOKEN'
    | 'QR_CODE'
    | 'GUEST';
}