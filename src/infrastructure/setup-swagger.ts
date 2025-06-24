import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from 'src/infrastructure/config/types/app-config.type';

function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');

  const appName = appConfig.name;
  const appUrl = appConfig.url;
  const nodeEnv = appConfig.nodeEnv ?? 'Development';

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('conectar Api')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(appUrl, nodeEnv)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: appName,
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
    },
  });

  const swaggerUrl = `${appUrl}/api-docs`;
  console.info(`Swagger docs available at: ${swaggerUrl}`);
}

export default setupSwagger;
