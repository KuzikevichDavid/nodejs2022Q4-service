import { Controller, Get, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { AllowAnon } from 'src/auth/anonymous.decorator';

@AllowAnon()
@Controller('doc')
export class DocController {
  @Get()
  async getFile(@Res() res: Response) {
    const file = createReadStream('./doc/api.yaml');
    return file.pipe(res);
  }
}
