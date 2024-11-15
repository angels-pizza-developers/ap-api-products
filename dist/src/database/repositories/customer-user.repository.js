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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUserRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("./base.repository");
const CustomerUser_1 = require("../entities/CustomerUser");
const typeorm_1 = require("typeorm");
let CustomerUserRepository = class CustomerUserRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(CustomerUser_1.CustomerUser, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
};
exports.CustomerUserRepository = CustomerUserRepository;
exports.CustomerUserRepository = CustomerUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CustomerUserRepository);
//# sourceMappingURL=customer-user.repository.js.map