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
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const Access_1 = require("../../database/entities/Access");
const database_utils_1 = require("../../shared/utils/database.utils");
const access_repository_1 = require("../../database/repositories/access.repository");
let AccessService = class AccessService {
    constructor(accessRepository) {
        this.accessRepository = accessRepository;
    }
    async getAccessPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, database_utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.accessRepository.find({
                where: {
                    ...condition,
                    active: true,
                },
                skip,
                take,
                order,
            }),
            this.accessRepository.count({
                where: {
                    ...condition,
                    active: true,
                },
            }),
        ]);
        return {
            results,
            total,
        };
    }
    async findOne(accessId) {
        const result = await this.accessRepository.findOne({
            select: {
                name: true,
                accessPages: true,
            },
            where: {
                accessId,
                active: true,
            },
        });
        if (!result) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Not found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async create(dto) {
        return await this.accessRepository.manager.transaction(async (entityManager) => {
            let access = new Access_1.Access();
            access.name = dto.name;
            access.accessPages = dto.accessPages;
            access = await entityManager.save(access);
            return await entityManager.save(Access_1.Access, access);
        });
    }
    async update(accessId, dto) {
        return await this.accessRepository.manager.transaction(async (entityManager) => {
            const access = await entityManager.findOne(Access_1.Access, {
                where: {
                    accessId,
                    active: true,
                },
            });
            if (!access) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            access.name = dto.name;
            access.accessPages = dto.accessPages;
            return await entityManager.save(Access_1.Access, access);
        });
    }
    async remove(accessId) {
        return await this.accessRepository.manager.transaction(async (entityManager) => {
            const access = await entityManager.findOne(Access_1.Access, {
                where: {
                    accessId,
                    active: true,
                },
            });
            if (!access) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            access.active = false;
            return await entityManager.save(Access_1.Access, access);
        });
    }
};
exports.AccessService = AccessService;
exports.AccessService = AccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [access_repository_1.AccessRepository])
], AccessService);
//# sourceMappingURL=access.service.js.map