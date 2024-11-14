import { USER_ROLE } from "src/shared/constants/user-role.constant";

export class RequestMetadataModel {
  readonly userId: string;
  readonly ipAddress: string;
  readonly "user-agent": string;
  readonly referer?: string; // Optional field
  readonly timezone?: string; // Optional field
  readonly role?: USER_ROLE; // Optional field
  [key: string]: any; // Allow for any additional properties

  constructor(partial: Partial<RequestMetadataModel>) {
    Object.assign(this, partial);
  }
}
