"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingConfigModule = void 0;
const common_1 = require("@nestjs/common");
const mapping_config_1 = require("./mapping-config");
let MappingConfigModule = class MappingConfigModule {
};
exports.MappingConfigModule = MappingConfigModule;
exports.MappingConfigModule = MappingConfigModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: "MAPPING_CONFIG",
                useValue: mapping_config_1.mappingConfig,
            },
        ],
        exports: ["MAPPING_CONFIG"],
    })
], MappingConfigModule);
//# sourceMappingURL=mapping-config.module.js.map