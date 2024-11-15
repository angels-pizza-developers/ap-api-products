export declare class Guest {
    guestId: string;
    sessionId: string;
    brand: "ANGELS_PIZZA" | "FIGARO_COFFEE";
    firstName: string;
    lastName: string;
    email: string | null;
    mobileNumber: string | null;
    mobileCountryCode: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    active: boolean;
}
