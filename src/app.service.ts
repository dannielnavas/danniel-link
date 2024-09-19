import { Injectable } from '@nestjs/common';
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
    const link = await this.shortUrlModel.findOne({
      identifier: payload.identifier,
    });
    if (link) {
      throw new Error('Identifier already exists');
    }
    const newLink = new this.shortUrlModel(payload);
    return newLink.save();
  }

  async get(identifier: string) {
    const link = await this.shortUrlModel.findOne({ identifier });
    if (!link) {
      throw new Error('Link not found');
    }
    // update click count
    link.click += 1;
    const newLink = this.shortUrlModel.findByIdAndUpdate(
      link._id,
      { $set: link },
      { new: false },
    );
    return newLink;
  }
}