import { Response } from "express";
export declare class PublicController {
    constructor();
    seePublicImages(image: string, res: Response): void;
    seeAssets(image: string, res: Response): void;
    getURLFileContent(url: string, res: Response): Promise<Response<any, Record<string, any>>>;
    fetchFileContent(url: string): Promise<string>;
}
