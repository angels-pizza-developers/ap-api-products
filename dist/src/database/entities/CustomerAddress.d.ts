import { CustomerUser } from "./CustomerUser";
export declare class CustomerAddress {
    customerAddressId: string;
    province: string | null;
    city: string | null;
    barangay: string | null;
    address: string | null;
    building: string | null;
    subdivision: string | null;
    houseNumber: string | null;
    locationCoordinates: object;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    customerUser: CustomerUser;
}
