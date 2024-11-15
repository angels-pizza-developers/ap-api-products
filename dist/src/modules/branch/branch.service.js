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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const Branch_1 = require("../../database/entities/Branch");
const branch_repository_1 = require("../../database/repositories/branch.repository");
const brand_constant_1 = require("../../shared/constants/brand.constant");
const database_utils_1 = require("../../shared/utils/database.utils");
let BranchService = class BranchService {
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, database_utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.branchRepository.find({
                where: {
                    ...condition,
                    active: true,
                },
                skip,
                take,
                order,
            }),
            this.branchRepository.count({
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
    async create(dto) {
        try {
            const branch = new Branch_1.Branch();
            branch.branchCode = dto.branchCode;
            branch.name = dto.name;
            branch.description = dto.description;
            branch.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
            branch.address = dto.address;
            return await this.branchRepository.save(branch);
        }
        catch (ex) {
            console.log(ex.message);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ex.message?.includes("duplicate")
                    ? "Already exist!"
                    : ex?.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const branch = await this.branchRepository.findOne({
            where: {
                branchId: id,
                active: true,
            },
        });
        if (!branch) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Not found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return branch;
    }
    async update(id, dto) {
        try {
            const branch = await this.branchRepository.findOne({
                where: {
                    branchId: id,
                    active: true,
                },
            });
            if (!branch) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            branch.branchCode = dto.branchCode;
            branch.name = dto.name;
            branch.description = dto.description;
            branch.address = dto.address;
            branch.updatedAt = (0, moment_1.default)().utc().toDate();
            return await this.branchRepository.save(branch);
        }
        catch (ex) {
            console.log(ex.message);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ex.message?.includes("duplicate")
                    ? "Already exist!"
                    : ex?.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const branch = await this.branchRepository.findOne({
                where: {
                    branchId: id,
                    active: true,
                },
            });
            if (!branch) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            branch.active = false;
            return await this.branchRepository.save(branch);
        }
        catch (ex) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ex.message?.includes("duplicate")
                    ? "Already exist!"
                    : ex?.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [branch_repository_1.BranchRepository])
], BranchService);
//# sourceMappingURL=branch.service.js.map