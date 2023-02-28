// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
   development: {
      client: 'sqlite3',
      connection: {
         filename: './src/database/db.sqlite',
      },
      migrations: {
         directory: './src/database/migrations',
      },
      useNullAsDefault: true,
   },

   staging: {
      client: 'postgresql',
      debug: true,
      connection: {
         host: 'containers-us-west-180.railway.app',
         port: 7472,
         user: 'postgres',
         password: 'ivahfj0FX0prL1914yrq',
         database: 'railway',
      },
   },

   production: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password',
      },
      pool: {
         min: 2,
         max: 10,
      },
      migrations: {
         tableName: 'knex_migrations',
      },
   },
};
