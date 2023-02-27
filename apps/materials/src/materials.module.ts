import { CacheModule, Module, CacheStore } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor, getConfig } from '@app/common';
import { GroupModule } from './materials/group/group.module';
import { MaterialModule } from './materials/material/material.module';
import { ProjectModule } from './materials/project/project.module';
import { TaskModule } from './materials/task/task.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { PermissionGuard } from './auth/guards/permission.guard';
import { MicroservicesModule } from './microservices/microservices.module';

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
    MicroservicesModule,
    GroupModule,
    TaskModule,
    MaterialModule,
    ProjectModule,
    AuthModule,
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
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class MaterialsModule {}
