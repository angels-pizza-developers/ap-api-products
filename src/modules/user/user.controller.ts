import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./service/user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { ApiResponseModel } from "src/common/models/api-response.model";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt")) // This ensures the user must be authenticated with JWT
  async getProfile(@Req() req: any, @Res() _res: Response) {
    const res: ApiResponseModel<any> = {} as any;
    try {
      if (!req.user || !req.user?.userId) {
        return _res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Invalid access token" });
      }
      res.data = await this.userService.getProfile(req.user?.userId);
      res.success = true;
      return _res.status(HttpStatus.OK).json(res);
    } catch (ex) {
      throw ex;
    }
  }
}
