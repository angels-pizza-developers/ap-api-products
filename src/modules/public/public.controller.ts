import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor() {}
  // Serve the image from the uploads folder
  @Get('static/images/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res: Response) {
    const path = join(process.cwd(), 'src/public/images', image);
    console.log(path)
    return res.sendFile(path);
  }

}
