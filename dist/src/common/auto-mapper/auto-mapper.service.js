"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoMapperService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
let AutoMapperService = class AutoMapperService {
    constructor(mappingConfig) {
        this.mappingConfig = mappingConfig;
    }
    map(source, targetClass, mappingKey) {
        const plainObject = (0, class_transformer_1.instanceToPlain)(source);
        const targetInstance = (0, class_transformer_1.plainToInstance)(targetClass, plainObject);
        const customConfig = this.mappingConfig[mappingKey];
        if (customConfig) {
            for (const [targetKey, mapFunction] of Object.entries(customConfig)) {
                targetInstance[targetKey] = mapFunction(plainObject[targetKey], plainObject);
            }
        }
        return targetInstance;
    }
};
exports.AutoMapperService = AutoMapperService;
exports.AutoMapperService = AutoMapperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("MAPPING_CONFIG")),
    __metadata("design:paramtypes", [Object])
], AutoMapperService);
//# sourceMappingURL=auto-mapper.service.js.map