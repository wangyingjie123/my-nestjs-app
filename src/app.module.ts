import { CacheModule, Module, CacheStore } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PageModule } from './materials/page/page.module';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { redisStore } from 'cache-manager-redis-store';
import { getConfig } from './utils';

const redisConfig = getConfig().REDIS_CONFIG;
@Module({
  imports: [
    // 全局的cacheModule
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
    // 全局解析ymal配置文件
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    AuthModule,
    PageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
