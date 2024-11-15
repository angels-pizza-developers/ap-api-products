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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../../database/repositories/category.repository");
const database_utils_1 = require("../../shared/utils/database.utils");
const Category_1 = require("../../database/entities/Category");
const brand_constant_1 = require("../../shared/constants/brand.constant");
const moment_1 = __importDefault(require("moment"));
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, database_utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.categoryRepository.find({
                where: {
                    ...condition,
                    active: true,
                },
                skip,
                take,
                order,
            }),
            this.categoryRepository.count({
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
            const category = new Category_1.Category();
            category.categoryCode = dto.categoryCode;
            category.name = dto.name;
            category.description = dto.description;
            category.brand = brand_constant_1.BRAND_TYPE.ANGELS_PIZZA;
            return await this.categoryRepository.save(category);
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
        const category = await this.categoryRepository.findOne({
            where: {
                categoryId: id,
                active: true,
            },
        });
        if (!category) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Not found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return category;
    }
    async update(id, dto) {
        try {
            const category = await this.categoryRepository.findOne({
                where: {
                    categoryId: id,
                    active: true,
                },
            });
            if (!category) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            category.categoryCode = dto.categoryCode;
            category.name = dto.name;
            category.description = dto.description;
            category.updatedAt = (0, moment_1.default)().utc().toDate();
            return await this.categoryRepository.save(category);
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
            const category = await this.categoryRepository.findOne({
                where: {
                    categoryId: id,
                    active: true,
                },
            });
            if (!category) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: "Not found",
                }, common_1.HttpStatus.NOT_FOUND);
            }
            category.active = false;
            return await this.categoryRepository.save(category);
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
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map