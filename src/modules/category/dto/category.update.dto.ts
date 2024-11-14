import { PartialType } from "@nestjs/swagger";
import { BaseCategoryDto } from "./category.base.dto";

export class UpdateCategoryDto extends PartialType(BaseCategoryDto) {}
