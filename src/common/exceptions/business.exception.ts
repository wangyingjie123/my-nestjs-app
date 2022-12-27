/**
 * @description 处理业务运行中预知且主动抛出的异常
 */

import { HttpStatus, HttpException } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

type BunsinessError = {
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(error: BunsinessError | string) {
    if (typeof error === 'string') {
      error = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: error,
      };
    }
    super(error, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '抱歉哦，您无此权限！',
    });
  }
}
