import { Repository, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
export declare class BaseRepository<T> extends Repository<T> {
    find(options?: FindManyOptions<T>): Promise<T[]>;
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    findOneBy(where: FindOptionsWhere<T>): Promise<T | null>;
    findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;
}
