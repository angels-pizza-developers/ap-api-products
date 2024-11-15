import { BaseCorporateUserDto } from "./corporate-user.base.dto";
declare const CreateCorporateUserDto_base: import("@nestjs/common").Type<Partial<BaseCorporateUserDto>>;
export declare class CreateCorporateUserDto extends CreateCorporateUserDto_base {
    password: string;
}
export {};
