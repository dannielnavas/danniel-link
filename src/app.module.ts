import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CountryService } from './country/country.service';
import { DatabaseModule } from './database/database.module';
import { ShortUrl, ShortUrlSchema } from './entities/app.entity';
import { Country, CountrySchema } from './entities/countries.entity';
import { environments } from './environments';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forFeature([
      {
        name: ShortUrl.name,
        schema: ShortUrlSchema,
      },
      {
        name: Country.name,
        schema: CountrySchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, CountryService],
})
export class AppModule {}
