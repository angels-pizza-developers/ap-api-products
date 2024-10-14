import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1', {
    exclude: ['auth/google/callback', 'auth/facebook/callback'],
  });
  console.log('checking process.env.NODE_ENV', process.env.NODE_ENV);
  console.log(
    'checking process.env.AWS_SECRETS_NAME',
    process.env.AWS_SECRETS_NAME,
  );
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  const options = new DocumentBuilder()
    .setTitle('ap-api-products')
    .setDescription('A documentation for ap-api-products')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'jwt',
    )
    .build();
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port, () => {
    console.log(
      '[WEB]',
      `${config.get<string>('BASE_URL')}:${config.get<string>('PORT')}` +
        '/swagger',
    );
  });
}
bootstrap();
