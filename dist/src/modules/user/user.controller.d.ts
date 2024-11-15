import { UserService } from "./service/user.service";
import { Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any, _res: Response): Promise<Response<any, Record<string, any>>>;
}
