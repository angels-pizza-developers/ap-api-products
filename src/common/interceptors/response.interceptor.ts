// src/shared/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";
import { ApiResponseModel } from "src/common/models/api-response.model";

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseModel<T>> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        return {
          statusCode,
          message: "Request successful",
          success: true,
          data,
        };
      }),
      catchError((err) => {
        const statusCode =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage =
          err instanceof HttpException
            ? err.message
            : err?.message
              ? err?.message
              : "Internal server error";

        // Re-throwing the error as an HttpException to let Nest handle it with the correct status code
        return throwError(
          () =>
            new HttpException(
              {
                message: errorMessage || "An error occurred",
                success: false,
                statusCode,
                error: errorMessage || "An unexpected error occurred",
              },
              statusCode,
            ),
        );
      }),
    );
  }
}
