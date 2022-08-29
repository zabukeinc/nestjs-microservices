import { MikroORM } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroormModel } from '../data/models/mikroorm.model';

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  dbName: 'nestjs-mikroorm',
  getDriver: MySqlDriver,
  entities: ['/dist/modules/mikroorm/data/models/*.js'],
  entitiesTs: [MikroormModel],
  migrations: {
    path: __dirname + '../../../migrations',
  },
  glob: '!(*.d).{js,ts}',
  transactional: true,
  disableForeignKeys: true,
  allOrNothing: true,
  dropTables: true,
  safe: false,
  snapshot: true,
  emit: 'ts',
  generator: TSMigrationGenerator,
  discovery: {
    warnWhenNoEntities: true,
    requireEntitiesArray: false,
    alwaysAnalyseProperties: true,
  },
  metadataProvider: TsMorphMetadataProvider,
  getLogger: (msg: string): void => console.log(msg),
} as Parameters<typeof MikroORM.init>[0];
