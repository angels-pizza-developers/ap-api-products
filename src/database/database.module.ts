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
        const config = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT'), 5433),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
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
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true', // Don't use 'true' in production
          ssl: configService.get<string>('SSL')?.toLowerCase() === 'true', // SSL support
          extra:
            configService.get<string>('SSL')?.toLowerCase() === 'true'
              ? { ssl: { require: true, rejectUnauthorized: false } }
              : {},
        };
        return config as any;
      },
    }),
    TypeOrmModule.forFeature([]), // Register your entities for repositories
  ],
  exports: [TypeOrmModule], // Export TypeOrmModule so other modules can use it
})
export class DatabaseModule {}
