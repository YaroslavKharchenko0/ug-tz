import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

export const createSwagger = (
  app: INestApplication,
) => {
  const builder = new DocumentBuilder();

  builder.setTitle('API');
  builder.setDescription('API description');
  builder.addBearerAuth();

  patchNestJsSwagger();

  const config = builder.build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
    yamlDocumentUrl: 'swagger/yaml',
  });
};
