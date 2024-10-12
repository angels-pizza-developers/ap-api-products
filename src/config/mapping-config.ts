import { USER_ROLE } from 'src/shared/constants/user-role.constant';

// src/common/config/mapping-config.ts
export const mappingConfig = {
  RegisterCustomerDtoToCreateUserDto: {
    username: (sourceValue, sourceObject) => {
      if (sourceObject.username && sourceObject.username !== '') {
        return sourceObject.username;
      } else if (
        (!sourceObject.username || sourceObject.username === '') &&
        sourceObject.email &&
        sourceObject.email !== ''
      ) {
        return sourceObject.email
      } else {
        return null;
      }
    },
    role: (sourceValue, sourceObject) => USER_ROLE.CUSTOMER,
  },
  RegisterCorporateDtoToCreateUserDto: {
    username: (sourceValue, sourceObject) => sourceObject.email,
    role: (sourceValue, sourceObject) => USER_ROLE.CORPORATE,
  },
  // Add more mappings for different entities and DTOs if needed
};
