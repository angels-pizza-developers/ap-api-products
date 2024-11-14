import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiTags } from "@nestjs/swagger";
import { StatusResponseFormat } from "src/common/decorators/status-response-format.decorator";
import { UseApiResponseFormat } from "src/common/decorators/use-api-response-format.decorator";
import { CreateCategoryDto } from "./dto/category.create.dto";
import { UpdateCategoryDto } from "./dto/category.update.dto";
import { PaginationParamsDto } from "src/shared/dtos/pagination-params.dto";

@UseApiResponseFormat("Request Success") // Default message
@StatusResponseFormat(200, "Success") // Custom message for 200
@StatusResponseFormat(404, "Resource not found") // Custom message for 404
@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    try {
      return await this.categoryService.getPagination(params);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
