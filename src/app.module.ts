import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    BackofficeModule,
    MongooseModule.forRoot('mongodb+srv://douglas:38914821@petshop-radix.mongodb.net/test?retryWrites=true&w=majority')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
