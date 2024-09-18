import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShortUrl extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true, unique: true })
  identifier: string;

  @Prop({ required: true })
  click: number;

  @Prop()
  createdAt: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
