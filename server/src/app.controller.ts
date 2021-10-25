import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth0Guard } from './auth0/auth0.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/dog')
  getDog(): string {
    return this.appService.getDog();
  }

  @Get('/cat')
  @UseGuards(Auth0Guard)
  getCat(): string {
    return this.appService.getCat();
  }
}
