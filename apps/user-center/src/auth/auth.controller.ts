import { Controller, Post, UseGuards, Res, Get, Query } from '@nestjs/common';

import { FeishuAuthGuard } from './guards/feishu-auth.guard';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTokenByApplications } from './auth.dto';
import { Public } from './constants';
import { PayloadUser } from '@app/common/helper';
import { getConfig } from '@app/common';
import { FeishuService } from '@/userCenter/user/feishu/feishu.service';
import { FastifyReply } from 'fastify';

const {
  FEISHU_CONFIG: { FEISHU_APP_ID },
} = getConfig();
@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly feishuService: FeishuService,
  ) {}

  @ApiOperation({
    summary: '登出',
    description: '服务器端清除 jwt cookies',
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: FastifyReply) {
    response.setCookie('jwt', '');
    return {};
  }

  @ApiOperation({
    summary: '飞书 Auth2 授权登录',
    description: `通过 code 获取'access_token'https://open.feishu.cn/open-apis/authen/v1/index?app_id=${FEISHU_APP_ID}&redirect_uri=http%3A%2F%2F10.1.60.82%3A3333%2F`,
  })
  @UseGuards(FeishuAuthGuard)
  @Public()
  @Get('/feishu/auth2')
  async getFeishuTokenByApplications(
    @PayloadUser() user: Payload,
    @Res({ passthrough: true }) response: FastifyReply,
    @Query() _query: GetTokenByApplications,
  ) {
    const { access_token } = await this.authService.login(user);

    response.setCookie('jwt', access_token, {
      path: '/',
    });

    return access_token;
  }

  @ApiOperation({
    summary: '解密 token 包含的信息',
    description: '解密 token 包含的信息',
  })
  @Get('/token/info')
  async getTokenInfo(@PayloadUser() user: Payload) {
    return user;
  }
}
