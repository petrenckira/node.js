import { Sequelize } from 'sequelize';

const DATABASE_URL = 'postgres://fngrwygf:8W6FxJaZgTqPrMPLEwEqb10CJY6ccPO-@rajje.db.elephantsql.com:5432/fngrwygf';

// export class Database extends Sequelize {
//   public database;

//   constructor() {
//     super();

//     if (!this.database) {
//       this.database = new Sequelize(DATABASE_URL);
//     }
//   }

//   getDatabase(): Sequelize {
//     return this.database;
//   }

// }

export const dbInstance = new Sequelize(DATABASE_URL);