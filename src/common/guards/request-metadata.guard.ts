import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { REQUEST_METADATA_HEADER_MISSING } from "src/shared/constants/request-metadata-error.constant";

@Injectable()
export class RequestMetadataGuard implements CanActivate {
  constructor(private readonly requiredHeaders: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check for required headers
    for (const header of this.requiredHeaders) {
      if (!request.headers[header.toLowerCase()]) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: `Missing required header: ${header}`,
            message: `Missing required header: ${header}`,
            errorCode: Object.keys(REQUEST_METADATA_HEADER_MISSING)[0],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return true; // Proceed if all required headers are present
  }
}
