import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BrandPermissions } from './entities/BrandPermissions';
import { CategoryDetails } from './entities/CategoryDetails';
import { CategorySortOrder } from './entities/CategorySortOrder';
import { DaysAvailability } from './entities/DaysAvailability';
import { DeliverySegment } from './entities/DeliverySegment';
import { MobileInfo } from './entities/MobileInfo';
import { OptionValuePricing } from './entities/OptionValuePricing';
import { OptionValuePricingDetail } from './entities/OptionValuePricingDetail';
import { OrderMode } from './entities/OrderMode';
import { Product } from './entities/Product';
import { ProductOption } from './entities/ProductOption';
import { ProductOptionValue } from './entities/ProductOptionValue';
import { ProfileCorporate } from './entities/ProfileCorporate';
import { ProfileCustomer } from './entities/ProfileCustomer';
import { ServiceChannel } from './entities/ServiceChannel';
import { User } from './entities/User';
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
        CategoryDetails,
        CategorySortOrder,
        DaysAvailability,
        DeliverySegment,
        OptionValuePricing,
        OptionValuePricingDetail,
        OrderMode,
        Product,
        ProductOption,
        ProductOptionValue,
        ServiceChannel,
        User,
        ProfileCustomer,
        ProfileCorporate,
        UserAuthLog,
        BrandPermissions,
        MobileInfo,
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
