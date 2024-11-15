"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
class BaseRepository extends typeorm_1.Repository {
    async find(options) {
        if (!options || !options.where) {
            throw new common_1.BadRequestException('A "where" condition is required for all find operations.');
        }
        return super.find(options);
    }
    async findOne(options) {
        if (!options || !options.where) {
            throw new common_1.BadRequestException('A "where" condition is required for findOne operations.');
        }
        return super.findOne(options);
    }
    async findOneBy(where) {
        if (!where) {
            throw new common_1.BadRequestException('A "where" condition is required for findOneBy operations.');
        }
        return super.findOneBy(where);
    }
    async findAndCount(options) {
        if (!options || !options.where) {
            throw new common_1.BadRequestException('A "where" condition is required for findAndCount operations.');
        }
        return super.findAndCount(options);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map