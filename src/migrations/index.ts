import * as migration_20250214_102337_initial from './20250214_102337_initial';

export const migrations = [
  {
    up: migration_20250214_102337_initial.up,
    down: migration_20250214_102337_initial.down,
    name: '20250214_102337_initial'
  },
];
