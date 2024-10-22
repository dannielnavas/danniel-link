import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as parser from 'ua-parser-js';
import { CreateShotLinkDto } from './dtos/app.dto';
import { ShortUrl } from './entities/app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(ShortUrl.name)
    private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(payload: CreateShotLinkDto) {
    if (payload.key !== process.env.KEY) {
      throw new ForbiddenException('Invalid key');
    }
    const link = await this.shortUrlModel.findOne({
      identifier: payload.identifier,
    });
    if (link) {
      throw new NotFoundException('Identifier already exists');
    }
    const newLink = new this.shortUrlModel(payload);
    return newLink.save();
  }

  async get(
    identifier: string,
    country: string,
    userAgent: string,
  ): Promise<ShortUrl> {
    const link = await this.shortUrlModel.findOne({ identifier });
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    // Update click count directly
    link.click += 1;

    const result = parser(userAgent);

    console.log(result);

    // Update clicksByCountry (optimized for efficiency)
    const countryIndex = link.clicksByCountry.findIndex(
      (c) => c.name === country,
    );
    if (countryIndex === -1) {
      link.clicksByCountry.push({ name: country, click: 1 });
    } else {
      const sumCountry = Number(link.clicksByCountry[countryIndex].click);
      link.clicksByCountry[countryIndex].click = String(sumCountry + 1);
    }

    // Update clicksBySo (optimized for efficiency)
    const platformIndex = link.clicksBySo.findIndex(
      (c) => c.name === result.os.name,
    );
    if (platformIndex === -1) {
      link.clicksBySo.push({ name: result.os.name, click: 1 });
    } else {
      const sumPlatform = Number(link.clicksBySo[platformIndex].click);
      link.clicksBySo[platformIndex].click = String(sumPlatform + 1);
    }

    // Update clicksByBrowser (optimized for efficiency)
    const browserIndex = link.clicksByBrowser.findIndex(
      (c) => c.name === result.browser.name,
    );
    if (browserIndex === -1) {
      link.clicksByBrowser.push({ name: result.browser.name, click: 1 });
    } else {
      const sumBrowser = Number(link.clicksByBrowser[browserIndex].click);
      link.clicksByBrowser[browserIndex].click = String(sumBrowser + 1);
    }

    // Efficiently save the updated document
    await link.save(); // This will save all the modifications made to the link object

    return link;
  }

  async getAllLinks() {
    return await this.shortUrlModel.find();
  }
}
