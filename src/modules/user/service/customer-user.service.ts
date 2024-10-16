import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerUser } from 'src/database/entities/CustomerUser';
import { User } from 'src/database/entities/User';
import { UserAuth } from 'src/database/entities/UserAuth';
import { AUTH_METHOD } from 'src/shared/constants/auth-method.constant';
import { USER_ROLE } from 'src/shared/constants/user-role.constant';
import { hash } from 'src/shared/utils/hash.utils';
import { Repository } from 'typeorm';
import { BRAND_TYPE } from '../../../shared/constants/brand.constant';
import { RegisterCustomerUserDto } from 'src/modules/auth/dto/register.dto';

@Injectable()
export class CustomerUserService {
  constructor(
    @InjectRepository(CustomerUser)
    private readonly customerUserRepo: Repository<CustomerUser>,
  ) {}

  async registerCustomer(
    dto: RegisterCustomerUserDto,
    authMethod: 'PASSWORD' | 'GOOGLE' | 'FACEBOOK',
  ) {
    return this.customerUserRepo.manager.transaction(async (entityManager) => {
      try {
        let user = new User();
        user.role = USER_ROLE.CUSTOMER as any;
        user.brand = BRAND_TYPE.ANGELS_PIZZA as any;
        user = await entityManager.save(User, user);

        let userAuth = new UserAuth();
        userAuth.user = user;
        userAuth.authMethod = authMethod;
        userAuth.providerUserId = dto.email;
        userAuth.isVerified = false;
        userAuth.passwordHash = await hash(dto.password);
        if (
          authMethod === 'PASSWORD' &&
          (!dto.password || dto.password === '')
        ) {
          throw new Error('Password is required');
        }
        userAuth = await entityManager.save(UserAuth, userAuth);

        let customerUser = new CustomerUser();
        customerUser.user = user;
        customerUser.brand = BRAND_TYPE.ANGELS_PIZZA as any;
        customerUser.firstName = dto.firstName;
        customerUser.middleName = dto.middleName;
        customerUser.lastName = dto.lastName;
        if (authMethod === AUTH_METHOD.PASSWORD.toString()) {
          customerUser.email = dto.email;
          customerUser.mobileNumber = dto.mobileDetails.mobileNumber;
          customerUser.mobileCountryCode = dto.mobileDetails.mobileCountryCode;
        }
        customerUser = await entityManager.save(CustomerUser, customerUser);
        customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserId: customerUser?.customerUserId,
          },
          relations: {
            user: {
              userAuths: true,
            },
          },
        });
        return customerUser;
      } catch (ex) {
        throw ex;
      }
    });
  }
}
