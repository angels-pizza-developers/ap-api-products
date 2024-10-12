import { DataSource } from 'typeorm';
import { ProductRepository } from './repositories/product.repository';
import { UserRepository } from './repositories/user.repository';
export const repositoryProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserRepository),
    inject: ['AP_DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductRepository),
    inject: ['AP_DATA_SOURCE'],
  },
  // You can add more repository providers here as needed
];
