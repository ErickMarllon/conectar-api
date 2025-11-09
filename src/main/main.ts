import { LoggerService } from '@/infrastructure/gateways/logger/logger.service';
import { AllExceptionFilter } from '@/infrastructure/http/filters';
import { paginateResultInterceptor } from '@/infrastructure/http/interceptors/paginate';
import { setupSwagger } from '@/infrastructure/http/swagger';
import { ParsepaginatePipe } from '@/shared/pipes/parse-paginate.pipe';
import { ParseSortJsonPipe } from '@/shared/pipes/parse-sort-json.pipe';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import session from 'express-session';

import helmet from 'helmet';
import 'multer';
import passport from 'passport';
import { AppConfig } from '../infrastructure/config/types/app-config.type';
import {
  LoggerInterceptor,
  ValidationInterceptor,
} from '../infrastructure/http/interceptors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');
  const logger = new LoggerService();

  app.enableCors({
    origin: appConfig.corsOrigin,
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix(appConfig.apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
    new ParseSortJsonPipe(),
    new ParsepaginatePipe(),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ValidationInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalInterceptors(new paginateResultInterceptor());

  app.useGlobalFilters(new AllExceptionFilter(logger));

  app.use(helmet());

  app.use(
    session({
      secret: 'SESSION',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  setupSwagger(appConfig.apiPrefix, app);

  await app.listen(appConfig.port);
  const url = `http://localhost:${appConfig.port}/${appConfig.apiPrefix}`;
  console.info(`🚀 API running at: ${url}`);
  console.info(`📚 Swagger docs at: ${url}/api-docs`);
  console.info(`🌱 Environment: ${appConfig.nodeEnv}`);
  return app;
}

bootstrap();
