import { CacheModule, Module, CacheStore } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor, getConfig } from '@app/common';
import { GroupModule } from './materials/group/group.module';
import { MaterialModule } from './materials/material/material.module';
import { ProjectModule } from './materials/project/project.module';
import { TaskModule } from './materials/task/task.module';

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
    GroupModule,
    TaskModule,
    MaterialModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class MaterialsModule {}
