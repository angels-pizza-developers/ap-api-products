import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { FirebaseModule } from './integrations/firebase/firebase.module'; // Firebase integration
// import { SqsModule } from './integrations/aws-sqs/sqs.module'; // AWS SQS integration
// import { WebSocketModule } from './integrations/websockets/ws.module'; // WebSocket integration
import { AuthModule } from "./modules/auth/auth.module"; // Authentication module
import { ProductModule } from "./modules/product/product.module"; // Product module
import { OrderModule } from "./modules/order/order.module"; // Order module
import { FirebaseModule } from "./integrations/firebase/firebase.module";
import { OnesignalModule } from "./integrations/onesignal/onesignal.module";
import { UserModule } from "./modules/user/user.module";
// import { ConfigAppModule } from './config/config.module';
import { createConfig } from "./config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PublicModule } from "./modules/public/public.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccessModule } from "./modules/access/access.module";
import { CorporateUserModule } from "./modules/corporate-user/corporate-user.module";
import { CustomerUserModule } from "./modules/customer-user/customer-user.module";
import { BranchUserModule } from "./modules/branch-user/branch-user.module";
import { DriverUserModule } from "./modules/driver-user/driver-user.module";
import { CategoryModule } from "./modules/category/category.module";
import { BranchModule } from "./modules/branch/branch.module";
const config = createConfig();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads .env and is accessible globally
      ...config,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "public"), // Serve files from /public
      serveRoot: "/public", // Access via /public in URL
    }),
    // ConfigAppModule, // Configuration module
    // DatabaseModule, // Database module with TypeORM support
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    FirebaseModule, // Firebase integration
    OnesignalModule,
    // SqsModule,        // AWS SQS integration
    // WebSocketModule,  // WebSocket integration
    AuthModule, // Authentication module
    UserModule,
    BranchModule,
    PublicModule,
    AccessModule,
    CorporateUserModule,
    CustomerUserModule,
    BranchUserModule,
    DriverUserModule,
    CategoryModule, // Order management module
    ProductModule, // Product handling module
    OrderModule,
  ],
  controllers: [AppController], // Root level controller
  providers: [AppService], // Root level service
})
export class AppModule {}
