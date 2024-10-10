import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShortUrl extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true, unique: true })
  identifier: string;

  @Prop({ default: 0 })
  click: number;

  @Prop({ type: Map, of: Number, default: {} })
  clicksByCountry: { [key: string]: number };

  @Prop({ default: Date.now })
  createdAt: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
