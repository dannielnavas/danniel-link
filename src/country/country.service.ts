import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCountryDto } from 'src/dtos/countries.dto';
import { Country } from 'src/entities/countries.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async create(payload: CreateCountryDto, ShortUrl: string) {
    console.log(ShortUrl);
    const country = await this.countryModel.findOne({
      code: payload.code,
      ShortUrl,
    });
    if (country) {
      country.visits += 1;
      return country.save();
    }
    const newPayload = { ...payload, ShortUrl };
    const newCountry = new this.countryModel(newPayload);
    return newCountry.save();
  }
}
