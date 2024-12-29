import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ShortUrl extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true, unique: true })
  identifier: string;

  @Prop({ default: 0 })
  click: number;

  @Prop({
    type: [{ name: { type: String }, click: { type: String } }],
  })
  clicksByCountry: Types.Array<Record<string, string>>;

  @Prop({
    type: [{ name: { type: String }, click: { type: String } }],
  })
  clicksBySo: Types.Array<Record<string, string>>;

  @Prop({
    type: [{ name: { type: String }, click: { type: String } }],
  })
  clicksByBrowser: Types.Array<Record<string, string>>;

  @Prop({ default: Date.now })
  createdAt: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
