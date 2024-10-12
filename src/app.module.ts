import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigAppModule } from './config/config.module'; // Importing the custom config module
import { DatabaseModule } from './database/database.module'; // Database module for handling entities and repositories
// import { FirebaseModule } from './integrations/firebase/firebase.module'; // Firebase integration
// import { SqsModule } from './integrations/aws-sqs/sqs.module'; // AWS SQS integration
// import { WebSocketModule } from './integrations/websockets/ws.module'; // WebSocket integration
import { AuthModule } from './modules/auth/auth.module'; // Authentication module
import { ProductModule } from './modules/product/product.module'; // Product module
import { OrderModule } from './modules/order/order.module'; // Order module
import { FirebaseModule } from './integrations/firebase/firebase.module';
import { OnesignalModule } from './integrations/onesignal/onesignal.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads .env and is accessible globally
    }),
    ConfigAppModule, // Configuration module
    DatabaseModule, // Database module with TypeORM support
    FirebaseModule, // Firebase integration
    OnesignalModule,
    // SqsModule,        // AWS SQS integration
    // WebSocketModule,  // WebSocket integration
    AuthModule, // Authentication module
    ProductModule, // Product handling module
    OrderModule,
    UserModule, // Order management module
  ],
  controllers: [], // Root level controller
  providers: [], // Root level service
})
export class AppModule {}
