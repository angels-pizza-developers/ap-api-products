import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiResponseModel } from "src/common/models/api-response.model";
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponseModel<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseModel<T>>;
}
