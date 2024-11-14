import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { CorporateUserService } from "./corporate-user.service";
import { CreateCorporateUserDto } from "./dto/corporate-user.create.dto";
import { ApiTags } from "@nestjs/swagger";
import { StatusResponseFormat } from "src/common/decorators/status-response-format.decorator";
import { UseApiResponseFormat } from "src/common/decorators/use-api-response-format.decorator";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { UpdateCorporateUserDto } from "./dto/corporate-user.update.dto";

@UseApiResponseFormat("Request Success") // Default message
@StatusResponseFormat(200, "Success") // Custom message for 200
@StatusResponseFormat(404, "Resource not found") // Custom message for 404
@ApiTags("corporate-user")
@Controller("corporate-user")
export class CorporateUserController {
  constructor(private readonly corporateUserService: CorporateUserService) {}

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    return await this.corporateUserService.getPagination(params);
  }

  @Post()
  create(@Body() createCorporateUserDto: CreateCorporateUserDto) {
    return this.corporateUserService.create(createCorporateUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.corporateUserService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateCorporateUserDto) {
    return await this.corporateUserService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.corporateUserService.remove(id);
  }
}
