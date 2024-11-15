"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            const statusCode = context.switchToHttp().getResponse().statusCode;
            return {
                statusCode,
                message: "Request successful",
                success: true,
                data,
            };
        }), (0, rxjs_1.catchError)((err) => {
            const statusCode = err instanceof common_1.HttpException
                ? err.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const errorMessage = err instanceof common_1.HttpException
                ? err.message
                : err?.message
                    ? err?.message
                    : "Internal server error";
            return (0, rxjs_1.throwError)(() => new common_1.HttpException({
                message: errorMessage || "An error occurred",
                success: false,
                statusCode,
                error: errorMessage || "An unexpected error occurred",
            }, statusCode));
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map