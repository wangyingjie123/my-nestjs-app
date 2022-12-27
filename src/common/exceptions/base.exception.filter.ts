/**
 * @file Base exception filter
 * @description 全局异常拦截
 */
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  // HttpException,
  ServiceUnavailableException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    request.log.error(exception);

    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
    });
  }
}
