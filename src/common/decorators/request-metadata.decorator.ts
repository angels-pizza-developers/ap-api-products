import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { RequestMetadataModel } from "../models/request-metadata.model";
import * as moment from "moment-timezone";
import {
  GEOLOCATION_INVALID_FORMAT,
  TIMEZONE_INVALID_FORMAT,
} from "src/shared/constants/request-metadata-error.constant";

export const RequestMetadata = createParamDecorator(
  (data: string[] = [], ctx: ExecutionContext): RequestMetadataModel => {
    const request = ctx.switchToHttp().getRequest();

    // Extract user information (assumed)
    const userId = request.user?.id;

    // Extract IP address
    const ipAddress = request.ip || request.connection.remoteAddress; // Fallback to connection info if needed

    //Validate geolocation value
    const geolocationRegex = /^-?\d{1,3}(\.\d+)?\s*,\s*-?\d{1,3}(\.\d+)?$/;
    if (
      data.includes("geolocation") &&
      (!request.headers["geolocation"] ||
        !geolocationRegex.test(request.headers["geolocation"]))
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Invalid geolocation format.",
          message: GEOLOCATION_INVALID_FORMAT,
          errorCode: Object.keys(GEOLOCATION_INVALID_FORMAT)[0],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Validate timezone value

    // Regex pattern for validating the format of the timezone (Region/City)
    const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/;

    // Check if timezone exists and matches the regex
    if (
      data.includes("timezone") &&
      (!request.headers["timezone"] ||
        !timezoneRegex.test(request.headers["timezone"]))
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Invalid timezone format.",
          message: TIMEZONE_INVALID_FORMAT,
          errorCode: Object.keys(TIMEZONE_INVALID_FORMAT)[0],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if the timezone is a valid IANA timezone using moment-timezone
    if (
      data.includes("timezone") &&
      !moment.tz.zone(request.headers["timezone"])
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Invalid timezone.",
          message: TIMEZONE_INVALID_FORMAT,
          errorCode: Object.keys(TIMEZONE_INVALID_FORMAT)[0],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Dynamically extract any other required headers
    const additionalHeaders = {};
    if (data && data.length > 0) {
      data.forEach((header) => {
        additionalHeaders[header] = request.headers[header.toLowerCase()];
      });
    }

    return new RequestMetadataModel({
      userId,
      ipAddress,
      ...additionalHeaders,
    });
  },
);
