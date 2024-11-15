import { BranchUser } from "./BranchUser";
export declare class Branch {
    branchId: string;
    branchCode: string | null;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE" | null;
    name: string | null;
    description: string | null;
    address: string | null;
    province: string | null;
    city: string | null;
    country: string | null;
    phone: string | null;
    locationCoordinates: string | null;
    disposition: string | null;
    paymentMethodIds: string[] | null;
    minOrderValue: string;
    maxOrderValue: string;
    opensAt: string | null;
    closesAt: string | null;
    closedFrom: Date | null;
    closedUntil: Date | null;
    isOperational: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
    branchUsers: BranchUser[];
}
