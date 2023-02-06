import { Controller, Get, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('doc')
export class DocController {
  @Get()
  async index(@Res() res: Response) {
    const port = +process.env.PORT + 1 || 4001;
    return res
      .status(302)
      .redirect(
        `https://editor.swagger.io/?url=https://localhost:${port}/doc/file`,
      );
  }

  @Get('/file')
  async getFile(@Res() res: Response) {
    const file = createReadStream('./doc/api.yaml');
    return file.pipe(res);
  }
}
