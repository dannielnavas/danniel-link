import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateShotLinkDto } from './dtos/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllLinks() {
    return await this.appService.getAllLinks();
  }

  @Post()
  createShortLink(@Body() payload: CreateShotLinkDto) {
    return this.appService.create(payload);
  }

  @Get(':identifier')
  async getLink(@Param('identifier') identifier: string) {
    const data = this.appService.get(identifier);
    return data;
  }
}
