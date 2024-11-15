"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverUserService = void 0;
const common_1 = require("@nestjs/common");
let DriverUserService = class DriverUserService {
    create(createDriverUserDto) {
        return "This action adds a new driverUser";
    }
    findAll() {
        return `This action returns all driverUser`;
    }
    findOne(id) {
        return `This action returns a #${id} driverUser`;
    }
    update(id, updateDriverUserDto) {
        return `This action updates a #${id} driverUser`;
    }
    remove(id) {
        return `This action removes a #${id} driverUser`;
    }
};
exports.DriverUserService = DriverUserService;
exports.DriverUserService = DriverUserService = __decorate([
    (0, common_1.Injectable)()
], DriverUserService);
//# sourceMappingURL=driver-user.service.js.map