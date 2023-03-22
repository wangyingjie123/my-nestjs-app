import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import packageConfig from '../../../package.json' assert { type: 'json' };

export const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('用户系统')
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/doc', app, document);
};
