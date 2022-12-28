import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';

@Module({
  controllers: [FeishuController],
  providers: [FeishuService],
})
export class UserModule {}
