import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { CustomLogger } from './shared/services/custom-logger.service';
import { from } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new CustomLogger()});
  app.use(compression());
  //open api(swagger)
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API do projeto petshop')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('docs',app,document); //url//docs

  await app.listen(3000);
}
bootstrap();
