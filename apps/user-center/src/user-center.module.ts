import { CacheModule, Module, CacheStore } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor } from '@app/common';
import { redisStore } from 'cache-manager-redis-store';
import { getConfig } from '@app/common';
import { UserModule } from './userCenter/user/user.module';
import { AuthModule } from './auth/auth.module';

const redisConfig = getConfig().REDIS_CONFIG;
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: redisConfig.host,
            port: +redisConfig.port,
          },
          password: redisConfig.auth,
          ttl: 60 * 60 * 64 * 7,
        });
        return {
          store: {
            create: () => store as unknown as CacheStore,
          },
        };
      },
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class UserCenterModule {}
