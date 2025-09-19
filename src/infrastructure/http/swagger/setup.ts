import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../../../../package.json';

export const setupSwagger = (prefix: string, app: INestApplication) => {
  const title =
    name.charAt(0).toUpperCase() + name.slice(1).replace(/_/gm, ' ');
  const config = new DocumentBuilder()
    .setTitle(title as string)
    .setDescription(description as string)
    .setVersion(version as string)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/api-docs`, app, document);
};
