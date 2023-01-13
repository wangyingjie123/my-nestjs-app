import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BusinessException } from '@/common/exceptions/business.exception';
import { UserService } from './user.service';
import { AddUserDto } from './dto/create-user.dto';

@ApiTags('用户信息')
@Controller({
  path: 'user',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }

  @ApiOperation({
    summary: '获取yaml配置文件中的值',
  })
  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL])
  findError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了！');
    }

    return 'i am new error';
  }

  @Get(':id')
  @Version([VERSION_NEUTRAL])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  @Version([VERSION_NEUTRAL])
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
