import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async getLink(
    @Param('identifier') identifier: string,
    @Headers('x-vercel-ip-country') country: string,
    @Headers('sec-ch-ua-platform') platform: string,
    @Headers('sec-ch-ua') configBrowser: string,
    @Headers('user-agent') userAgent: string,
    @Res()
    res: Response,
  ) {
    const data = await this.appService.get(identifier, country, userAgent);
    return res.redirect(data.url);
  }
}
