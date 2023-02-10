/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OmitType } from '@nice-dtos/mapped-types';
import { BigParty, GetBigPartyDto } from '@nice-dtos/models';
import { plainToInstance } from 'class-transformer';

import { AppModule } from './app/app.module';

const t = {
  "id": 1,
  "created": "2023-02-07T22:03:31.000Z",
  "updated": "2023-02-07T22:03:31.000Z",
  "deleted": null,
  "createdById": null,
  "updatedById": null,
  "deletedById": null,
  "start": "2023-02-07T21:58:44.941Z"
}

class T extends BigParty { }
class B extends OmitType(BigParty, []) { }
console.log(plainToInstance(BigParty, t), plainToInstance(GetBigPartyDto, t), plainToInstance(B, t), plainToInstance(T, t));


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({ origin: '*' })
  const config = new DocumentBuilder()
    .setTitle('Shared models example')
    .setDescription('Sample API using shared models')
    .setVersion('1.0')
    .addTag('models')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
