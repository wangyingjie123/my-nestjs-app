import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { UserController } from './user.controller';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService],
})
export class UserModule {}
