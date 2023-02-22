declare const module: any;
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { AppModule } from './app.module';
import { FastifyLogger } from './common/logger';
import { catchError } from './common/logger/catchError';
import { generateDocument } from './doc';
import fastifyCookie from '@fastify/cookie';

catchError();
async function bootstrap() {
  // 初始化fastify
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });
  // 创建nest 实例
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );
  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });
  // 统一响应格式
  // app.useGlobalInterceptors(new TransformInterceptor());

  // 异常捕获器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 设置全局接口前缀
  app.setGlobalPrefix('api');

  // 格式化 cookie
  app.use(cookieParser());

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  // 创建文档
  generateDocument(app);

  // 启动服务
  await app.listen(3005);

  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
