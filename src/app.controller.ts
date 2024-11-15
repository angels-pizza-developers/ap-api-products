import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { formatHours } from "./shared/utils/time-formatter.utils";

@ApiTags("default")
@Controller("default")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("test")
  test() {
    return [
      formatHours("1hr"),
      formatHours("2hr"),
      formatHours("3hr"),
      formatHours("4hr"),
      formatHours("0hr"),
    ];
  }
}
