import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost',
  apiPrefix: process.env.API_PREFIX || 'api',
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  
  authTokenExpire: process.env.AUTH_TOKEN_EXPIRE,
  authAlgorithm: process.env.AUTH_ALGORITHM,
}));
