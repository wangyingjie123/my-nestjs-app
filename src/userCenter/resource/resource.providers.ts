import { Resource } from './resource.mongo.entity';

export const ResourceProviders = [
  {
    provide: 'RESOURCE_REPOSITORY',
    useFactory: (AppDataSource) => AppDataSource.getRepository(Resource),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
