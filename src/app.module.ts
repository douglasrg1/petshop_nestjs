import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import {MongooseModule} from '@nestjs/mongoose';
import {TypeOrmModule} from '@nestjs/typeorm';
import { StoreModule } from './modules/store/store.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/services/config.service';
const service = new ConfigService(`${process.env.NODE_ENV || './development'}.env`);

@Module({
  imports: [
    BackofficeModule,
    ConfigModule,
    StoreModule,
    MongooseModule.forRoot(service.get('DATABASE_CONNECTION')),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'teste123',
      database: '7180',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
