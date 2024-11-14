import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { AccessService } from "./access.service";
import { UpdateAccessDto } from "./dto/access.update.dto";
import { ApiTags } from "@nestjs/swagger";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { UseApiResponseFormat } from "src/common/decorators/use-api-response-format.decorator";
import { StatusResponseFormat } from "src/common/decorators/status-response-format.decorator";
import { CreateAccessDto } from "./dto/access.create.dto";

@UseApiResponseFormat("Request Success") // Default message
@StatusResponseFormat(200, "Success") // Custom message for 200
@StatusResponseFormat(404, "Resource not found") // Custom message for 404
@ApiTags("access")
@Controller("access")
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    return await this.accessService.getAccessPagination(params);
  }

  @Post()
  async create(@Body() dto: CreateAccessDto) {
    return await this.accessService.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.accessService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateAccessDto) {
    return await this.accessService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.accessService.remove(id);
  }
}
