import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    platform: string,
    configBrowser: string,
  ): Promise<ShortUrl> {
    const link = await this.shortUrlModel.findOne({ identifier });
    if (!link) {
      throw new NotFoundException('Link not found');
    }
    // update click count
    link.click += 1;
    console.log(country);
    console.log(platform);
    console.log(configBrowser);
    const browserName = this.getBrowserName(configBrowser);
    console.log(browserName);

    const countyRegister = link.clicksByCountry.filter(
      (c) => c.name === country,
    );

    console.log(countyRegister, 'countyRegister');
    if (countyRegister.length === 0) {
      console.log('entro');
      const data = { name: country, click: 1 };
      link.clicksByCountry.push(data);
      console.log(link);
      console.log(link.clicksByCountry);
    } else {
      countyRegister[0].click += 1;
    }

    const platformRegister = link.clicksBySo.filter((c) => c.name === platform);
    console.log(platformRegister, 'platformRegister');
    if (platformRegister.length === 0) {
      link.clicksBySo.push({ name: platform, click: 1 });
      console.log(link);
      console.log(link.clicksBySo);
    } else {
      platformRegister[0].click += 1;
    }

    const browserRegister = link.clicksByBrowser.filter(
      (c) => c.name === browserName,
    );
    console.log(browserRegister, 'browserRegister');
    if (browserRegister.length === 0) {
      link.clicksByBrowser.push({ name: browserName, click: 1 });
      console.log(link);
      console.log(link.clicksByBrowser);
    } else {
      browserRegister[0].click += 1;
    }

    console.log(link);

    this.shortUrlModel.findByIdAndUpdate(
      link._id,
      { $set: link },
      { new: true },
    );
    return link.save();
  }

  getBrowserName(uaString: string): string {
    // Extraer todos los elementos de la cadena
    const uaElements = uaString.split(',').map((ua) => ua.trim());

    // Filtrar el elemento que contiene el nombre del navegador principal (sin "Not=A?Brand")
    const browserElement = uaElements.find((ua) => !ua.includes('Not=A?Brand'));

    // Extraer el nombre del navegador (el texto antes de ';')
    const browserName = browserElement.split(';')[0].replace(/"/g, '');

    return browserName;
  }

  async getAllLinks() {
    return await this.shortUrlModel.find();
  }
}
