import { Role } from './role.mongo.entity';

export const RoleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (AppDataSource) => AppDataSource.getRepository(Role),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
