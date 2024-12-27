import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { kafkaConfig } from './config/kafka.config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // app.useLogger(logger);
  app.use(cookieParser('secret-key'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);

  app.startAllMicroservices();

  await app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
  });
}
bootstrap();
