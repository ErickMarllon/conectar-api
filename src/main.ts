import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { AppModule } from './app.module';
import { AppConfig } from './infrastructure/config/types/app-config.type';
import { JwtConfig } from './infrastructure/config/types/jwt-config.type';
import setupSwagger from './infrastructure/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');
  const jwtConfig = configService.getOrThrow<JwtConfig>('jwt');

  app.use(
    session({
      secret: jwtConfig.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: appConfig.nodeEnv === 'production',
        httpOnly: true,
        sameSite: appConfig.nodeEnv === 'production' ? 'none' : 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  const corsOrigin = appConfig.corsOrigin;

  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix(appConfig.apiPrefix);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (appConfig.nodeEnv === 'development') {
    setupSwagger(app);
  }

  await app.listen(appConfig.port);
  return app;
}

void bootstrap();
