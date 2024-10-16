import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { FirebaseModule } from './integrations/firebase/firebase.module'; // Firebase integration
// import { SqsModule } from './integrations/aws-sqs/sqs.module'; // AWS SQS integration
// import { WebSocketModule } from './integrations/websockets/ws.module'; // WebSocket integration
import { AuthModule } from './modules/auth/auth.module'; // Authentication module
import { ProductModule } from './modules/product/product.module'; // Product module
import { OrderModule } from './modules/order/order.module'; // Order module
import { FirebaseModule } from './integrations/firebase/firebase.module';
import { OnesignalModule } from './integrations/onesignal/onesignal.module';
import { UserModule } from './modules/user/user.module';
// import { ConfigAppModule } from './config/config.module';
import { createConfig } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PublicModule } from './modules/public/public.module';
const config = createConfig();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads .env and is accessible globally
      ...config,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Serve files from /public
      serveRoot: '/public',                     // Access via /public in URL
    }),
    // ConfigAppModule, // Configuration module
    // DatabaseModule, // Database module with TypeORM support
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    FirebaseModule, // Firebase integration
    OnesignalModule,
    // SqsModule,        // AWS SQS integration
    // WebSocketModule,  // WebSocket integration
    AuthModule, // Authentication module
    ProductModule, // Product handling module
    OrderModule,
    UserModule,
    PublicModule, // Order management module
  ],
  controllers: [], // Root level controller
  providers: [], // Root level service
})
export class AppModule {}
