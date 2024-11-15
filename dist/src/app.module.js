"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const product_module_1 = require("./modules/product/product.module");
const order_module_1 = require("./modules/order/order.module");
const firebase_module_1 = require("./integrations/firebase/firebase.module");
const onesignal_module_1 = require("./integrations/onesignal/onesignal.module");
const user_module_1 = require("./modules/user/user.module");
const app_config_1 = require("./config/app.config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_service_1 = require("./database/typeorm.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const public_module_1 = require("./modules/public/public.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const access_module_1 = require("./modules/access/access.module");
const corporate_user_module_1 = require("./modules/corporate-user/corporate-user.module");
const customer_user_module_1 = require("./modules/customer-user/customer-user.module");
const branch_user_module_1 = require("./modules/branch-user/branch-user.module");
const driver_user_module_1 = require("./modules/driver-user/driver-user.module");
const category_module_1 = require("./modules/category/category.module");
const branch_module_1 = require("./modules/branch/branch.module");
const config = (0, app_config_1.createConfig)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                ...config,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "public"),
                serveRoot: "/public",
            }),
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigService }),
            firebase_module_1.FirebaseModule,
            onesignal_module_1.OnesignalModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            branch_module_1.BranchModule,
            public_module_1.PublicModule,
            access_module_1.AccessModule,
            corporate_user_module_1.CorporateUserModule,
            customer_user_module_1.CustomerUserModule,
            branch_user_module_1.BranchUserModule,
            driver_user_module_1.DriverUserModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map