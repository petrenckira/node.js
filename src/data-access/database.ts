import { Sequelize } from 'sequelize';

const DATABASE_URL = 'postgres://fngrwygf:8W6FxJaZgTqPrMPLEwEqb10CJY6ccPO-@rajje.db.elephantsql.com:5432/fngrwygf';

export const dbInstance = new Sequelize(DATABASE_URL);