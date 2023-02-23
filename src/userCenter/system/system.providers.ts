import { System } from './system.mongo.entity';

export const systemProviders = [
  {
    provide: 'SYSTEM_REPOSITORY',
    useFactory: (AppDataSource) => AppDataSource.getRepository(System),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
