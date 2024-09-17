import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, dbName } = configService.mongo;
        // const uri = `mongodb+srv://${user}:${password}@${host}.1kniivd.mongodb.net/?retryWrites=true&w=majority`;
        const uri = `mongodb+srv://dannielnavas:hWTZhnSTkubqbNCC@cluster0.beupb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        return {
          uri,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
