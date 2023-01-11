import { CacheModule, Module, CacheStore } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
