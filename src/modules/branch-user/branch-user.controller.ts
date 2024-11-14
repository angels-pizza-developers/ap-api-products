import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { BranchUserService } from "./branch-user.service";
import { ApiTags } from "@nestjs/swagger";
import { StatusResponseFormat } from "src/common/decorators/status-response-format.decorator";
import { UseApiResponseFormat } from "src/common/decorators/use-api-response-format.decorator";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { CreateBranchUserDto } from "./dto/branch-user.create.dto";
import { UpdateBranchUserDto } from "./dto/branch-user.update.dto";

@UseApiResponseFormat("Request Success") // Default message
@StatusResponseFormat(200, "Success") // Custom message for 200
@StatusResponseFormat(404, "Resource not found") // Custom message for 404
@ApiTags("branch-user")
@Controller("branch-user")
export class BranchUserController {
  constructor(private readonly branchUserService: BranchUserService) {}

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    return await this.branchUserService.getPagination(params);
  }

  @Post()
  create(@Body() createBranchUserDto: CreateBranchUserDto) {
    return this.branchUserService.create(createBranchUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.branchUserService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateBranchUserDto) {
    return await this.branchUserService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.branchUserService.remove(id);
  }
}
