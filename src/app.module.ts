import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import {MongooseModule} from '@nestjs/mongoose'
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    BackofficeModule,
    MongooseModule.forRoot('mongodb+srv://douglas:38914821@petshop-radix.mongodb.net/test?retryWrites=true&w=majority'),
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
