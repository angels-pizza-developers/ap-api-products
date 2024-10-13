import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import firebaseConfig from './firebase.config';
import sqsConfig from './sqs.config';
import { AwsSecretsService } from './aws-secrets.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import oauthConfig from './oauth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available across the entire application
      load: [appConfig, databaseConfig, firebaseConfig, sqsConfig, oauthConfig], // Load all config files
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`], // Load .env file dynamically
    }),
  ],
  providers: [
    AwsSecretsService,
    {
      provide: 'CONFIG',
      useFactory: async (awsSecretsService: AwsSecretsService) => {
        const environment = process.env.NODE_ENV || 'development';
        console.log(`this is ${environment} environment`);

        // Check if we're in production or not
        if (environment === 'production') {
          // Load secrets from AWS Secrets Manager in production
          const secrets = await awsSecretsService.getSecret(
            process.env.AWS_SECRETS_NAME,
          );
          return { ...process.env, ...secrets };
        } else {
          // Load from local .env file for development
          const envPath = `.env.${environment}`;
          dotenv.config({ path: fs.existsSync(envPath) ? envPath : '.env' });
          return process.env;
        }
      },
      inject: [AwsSecretsService],
    },
  ],
  exports: ['CONFIG'],
})
export class ConfigAppModule {}
