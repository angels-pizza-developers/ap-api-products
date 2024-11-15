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
exports.CorporateUserRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("./base.repository");
const CorporateUser_1 = require("../entities/CorporateUser");
const typeorm_1 = require("typeorm");
let CorporateUserRepository = class CorporateUserRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(CorporateUser_1.CorporateUser, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
};
exports.CorporateUserRepository = CorporateUserRepository;
exports.CorporateUserRepository = CorporateUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CorporateUserRepository);
//# sourceMappingURL=corporate-user.repository.js.map