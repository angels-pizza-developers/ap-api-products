import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { BranchService } from "./branch.service";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";
import { CreateBranchDto } from "./dto/branch.create.dto";
import { UpdateBranchDto } from "./dto/branch.update.dto";
import { ApiTags } from "@nestjs/swagger";
import { StatusResponseFormat } from "src/common/decorators/status-response-format.decorator";
import { UseApiResponseFormat } from "src/common/decorators/use-api-response-format.decorator";

@ApiTags("branch")
@Controller("branch")
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    return await this.branchService.getPagination(params);
  }

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.branchService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBranchDto) {
    return this.branchService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.branchService.remove(id);
  }
}
