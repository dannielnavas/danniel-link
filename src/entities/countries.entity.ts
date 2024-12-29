import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ShortUrl } from './app.entity';

@Schema()
export class Country {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  visits: number;

  @Prop({
    type: Types.ObjectId,
    ref: ShortUrl.name,
  })
  ShortUrl: ShortUrl | Types.ObjectId;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
