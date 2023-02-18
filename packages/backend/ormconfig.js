// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    synchronize: false,
    name: 'default',
    type: 'clickhouse',
    url: process.env.DB_PG_URL_MIGRATIONS,
    schema: 'public',
    migrationsTableName: 'atr_migrations',
    migrations: ['migrations/**/*.ts'],
    cli: {
        migrationsDir: 'migrations',
    },
    logging: process.env.ENABLE_DB_LOGGING === 'true',
    entities: [path.join(__dirname, './libs/database/src/entity/**/*.entity.*s')],
    seeds: [path.join(__dirname, './libs/database/src/seeds/*.ts')],
    factories: [path.join(__dirname, './libs/database/src/seeds/factories/*.ts')],
};
