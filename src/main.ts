import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { AppModule } from './app.module';
import { FastifyLogger } from './common/logger';
import { generateDocument } from './doc';
import fastifyCookie from '@fastify/cookie';

declare const module: any;
async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );
  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });
  // 统一响应格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常捕获器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });
  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());
  // 创建文档
  generateDocument(app);
  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}

bootstrap();
