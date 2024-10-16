import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from './entities/Product';
import { ProductOption } from './entities/ProductOption';
import { ProductOptionType } from './entities/ProductOptionType';
import { ProductOptionValue } from './entities/ProductOptionValue';
import { ProductBranch } from './entities/ProductBranch';
import { AccessPermission } from './entities/AccessPermission';
import { AccessType } from './entities/AccessType';
import { UserAccessType } from './entities/UserAccessType';
import { Permission } from './entities/Permission';
import { User } from './entities/User';
import { UserAuth } from './entities/UserAuth';
import { CustomerUser } from './entities/CustomerUser';
import { CorporateUser } from './entities/CorporateUser';
import { BranchUser } from './entities/BranchUser';
import { DriverUser } from './entities/DriverUser';
import { Branch } from './entities/Branch';
import { PaymentMethod } from './entities/PaymentMethod';
import { Guest } from './entities/Guest';
import { ProductCategory } from './entities/ProductCategory';
import { Category } from './entities/Category';
import { UserAuthLog } from './entities/UserAuthLog';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const ssl = this.config.get<string>('SSL');
    const synchronize = this.config.get<string>('DB_SYNCHRONIZE');
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: Number(this.config.get<number>('DB_PORT')),
      database: this.config.get<string>('DB_DATABASE'),
      username: this.config.get<string>('DB_USERNAME'),
      password: this.config.get<string>('DB_PASSWORD'),
      entities: [
        Product,
        ProductOption,
        ProductOptionType,
        ProductOptionValue,
        ProductBranch,
        Category,
        ProductCategory,
        Permission,
        AccessPermission,
        AccessType,
        UserAccessType,
        Guest,
        User,
        UserAuth,
        UserAuthLog,
        CustomerUser,
        CorporateUser,
        BranchUser,
        DriverUser,
        Branch,
        PaymentMethod
      ],
      synchronize: synchronize.toLocaleLowerCase().includes('true'), // never use TRUE in production!
      ssl: ssl.toLocaleLowerCase().includes('true'),
      extra: {},
    };
    if (config.ssl) {
      config.extra.ssl = {
        require: true,
        rejectUnauthorized: false,
      };
    }
    return config;
  }
}
