import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnon } from './auth/anonymous.decorator';

@AllowAnon()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
