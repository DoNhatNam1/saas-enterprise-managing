import * as migration_20241123_144450_initial from './20241123_144450_initial';
import * as migration_20241123_145830_initial from './20241123_145830_initial';
import * as migration_20241123_151439_add_relation from './20241123_151439_add_relation';
import * as migration_20241123_202424_add_relation_join from './20241123_202424_add_relation_join';

export const migrations = [
  {
    up: migration_20241123_144450_initial.up,
    down: migration_20241123_144450_initial.down,
    name: '20241123_144450_initial',
  },
  {
    up: migration_20241123_145830_initial.up,
    down: migration_20241123_145830_initial.down,
    name: '20241123_145830_initial',
  },
  {
    up: migration_20241123_151439_add_relation.up,
    down: migration_20241123_151439_add_relation.down,
    name: '20241123_151439_add_relation',
  },
  {
    up: migration_20241123_202424_add_relation_join.up,
    down: migration_20241123_202424_add_relation_join.down,
    name: '20241123_202424_add_relation_join'
  },
];
