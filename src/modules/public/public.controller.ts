import { Controller, Get, Param, Res } from "@nestjs/common";
import { join } from "path";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("public")
@Controller("public")
export class PublicController {
  constructor() {}
  // Serve the image from the uploads folder
  @Get("static/images/:imgpath")
  seePublicImages(@Param("imgpath") image: string, @Res() res: Response) {
    const path = join(process.cwd(), "src/public/images", image);
    console.log(path);
    return res.sendFile(path);
  }
  // Serve the image from the uploads folder
  @Get("static/assets/:fileName")
  seeAssets(@Param("fileName") image: string, @Res() res: Response) {
    const path = join(process.cwd(), "src/public/assets", image);
    console.log(path);
    return res.sendFile(path);
  }
}
