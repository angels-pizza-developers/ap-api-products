import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { CategoryDetails } from './entities/CategoryDetails';
import { CategorySortOrder } from './entities/CategorySortOrder';
import { DaysAvailability } from './entities/DaysAvailability';
import { DeliverySegment } from './entities/DeliverySegment';
import { OptionValuePricing } from './entities/OptionValuePricing';
import { OptionValuePricingDetail } from './entities/OptionValuePricingDetail';
import { OrderMode } from './entities/OrderMode';
import { Product } from './entities/Product';
import { ProductOption } from './entities/ProductOption';
import { ProductOptionValue } from './entities/ProductOptionValue';
import { ServiceChannel } from './entities/ServiceChannel';
import { BrandPermissions } from './entities/BrandPermissions';
import { MobileInfo } from './entities/MobileInfo';
import { ProfileCorporate } from './entities/ProfileCorporate';
import { ProfileCustomer } from './entities/ProfileCustomer';
import { User } from './entities/User';
import { UserAuthLog } from './entities/UserAuthLog';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>('database'));
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: parseInt(configService.get<string>('database.port'), 5433),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
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
          ], // Add your entities here
          synchronize:
            configService.get<string>('database.synchronize') === 'true', // Don't use 'true' in production
          ssl:
            configService.get<string>('database.ssl')?.toLowerCase() === 'true', // SSL support
          extra:
            configService.get<string>('database.ssl')?.toLowerCase() === 'true'
              ? { ssl: { require: true, rejectUnauthorized: false } }
              : {},
        };
      },
    }),
    TypeOrmModule.forFeature([]), // Register your entities for repositories
  ],
  exports: [TypeOrmModule], // Export TypeOrmModule so other modules can use it
})
export class DatabaseModule {}
