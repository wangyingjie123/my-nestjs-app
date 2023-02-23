import { Privilege } from './privilege.mongo.entity';

export const PrivilegeProviders = [
  {
    provide: 'PRIVILEGE_REPOSITORY',
    useFactory: (AppDataSource) => AppDataSource.getRepository(Privilege),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
