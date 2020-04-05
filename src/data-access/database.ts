import { Sequelize } from 'sequelize';
const DATABASE_URL = 'postgres://fngrwygf:8W6FxJaZgTqPrMPLEwEqb10CJY6ccPO-@rajje.db.elephantsql.com:5432/fngrwygf';
// I have error during test when use process.env.DATABASE_URL
export const dbInstance = new Sequelize(DATABASE_URL);