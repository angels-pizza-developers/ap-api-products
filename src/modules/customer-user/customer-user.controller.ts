import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomerUserService } from "./customer-user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("customer-user")
@Controller("customer-user")
export class CustomerUserController {
  constructor(private readonly customerUserService: CustomerUserService) {}
}
