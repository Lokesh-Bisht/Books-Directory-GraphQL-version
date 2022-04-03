require('dotenv').config()

const dbOptions = {
   "type": "mysql",
   "host": process.env.DB_HOST,
   "port": 3306,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASSWORD ,
   "database": process.env.DB_NAME,
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/backend/entity/**/*.ts"
   ],
   "migrations": [
      "src/backend/migration/**/*.ts"
   ],
   "subscribers": [
      "src/backend/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/backend/entity",
      "migrationsDir": "src/backend/migration",
      "subscribersDir": "src/backend/subscriber"
   }
};

module.exports = dbOptions;